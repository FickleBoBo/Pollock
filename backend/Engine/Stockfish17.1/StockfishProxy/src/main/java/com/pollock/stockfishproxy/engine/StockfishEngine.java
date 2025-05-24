package com.pollock.stockfishproxy.engine;

import com.pollock.stockfishproxy.dto.response.EngineAnalysisResponseDTO;
import com.pollock.stockfishproxy.redis.RedisPublisher;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@RequiredArgsConstructor
public class StockfishEngine {

    private Process process;
    private BufferedReader br;
    private BufferedWriter bw;

    @Getter
    private long enginePid;

    @Getter
    @Setter
    private volatile boolean interrupted = false;

    private final String stockfishPath;

    // 타임아웃 3초
    private final long TIMEOUT = 3000;

    /**
     * 엔진 프로세스 시작
     */
    public boolean start() {
        try {
            process = new ProcessBuilder(stockfishPath).start();
            br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));

            sendCommand("uci");
            sendCommand("isready");

            enginePid = process.pid();
            log.info("✅ Stockfish 시작 성공 [pid={}]", enginePid);

            return true;
        } catch (IOException e) {
            log.error("❌ Stockfish 시작 실패 [path='{}']: {}", stockfishPath, e.getMessage(), e);
            return false;
        }
    }

    /**
     * 엔진 명령 전송
     */
    public void sendCommand(String command) {
        try {
            bw.write(command + "\n");
            bw.flush();
        } catch (IOException e) {
            log.error("❌ sendCommand 실패 [pid={}, cmd={}]", enginePid, command, e);
        }
    }

    /**
     * 엔진 분석 종료
     */
    public void stop() {
        log.info("🛑 stop() 호출됨 - 분석 중단 명령 전송 예정 [pid={}, interrupted={}]", enginePid, interrupted);
        sendCommand("stop");
        interrupted = true;
        log.info("✅ stop() 완료 - interrupted 플래그 설정됨 [pid={}, interrupted={}]", enginePid, interrupted);
    }

    /**
     * 엔진 프로세스 종료
     */
    public void quit() {
        log.info("🛑 Stockfish 종료 시도 [pid={}]", enginePid);

        try {
            sendCommand("quit");

            if (br != null) br.close();
            if (bw != null) bw.close();
            if (process != null) process.destroy();
        } catch (IOException e) {
            log.error("❌ Stockfish 종료 중 예외 발생 [pid={}, msg={}]", enginePid, e.getMessage(), e);
        }
    }

    public void publishEngineAnalysis(String channelKey, String fen, Integer multipv, Long movetime, RedisPublisher redisPublisher) {
        log.info("📡 분석 시작 [channelKey={}, fen={}, multipv={}, movetime={}]", channelKey, fen, multipv, movetime);

        sendCommand("setoption name MultiPV value  " + multipv);
        sendCommand("position fen " + fen);
        sendCommand("go movetime " + movetime);

        Integer score = null;
        Integer mate = null;
        Integer currentPv = null;
        List<String> pvList = null;

        long deadline = System.currentTimeMillis() + movetime + TIMEOUT;

        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.startsWith("bestmove")) break;

                // 퍼블리시
                if (line.startsWith("info")) {

                    if (line.contains("score cp")) {
                        score = extractScore(line, fen);
                        mate = null;
                    } else if (line.contains("score mate")) {
                        score = null;
                        mate = extractMate(line, fen);
                    }

                    if (line.contains("multipv")) {
                        currentPv = extractMultipv(line);
                    }

                    // 미완성 응답은 퍼블리싱 X
                    if (currentPv == null) {
                        continue;
                    }

                    if (line.contains(" pv ")) {
                        pvList = extractPvList(line);
                    }

                    EngineAnalysisResponseDTO responseDTO = EngineAnalysisResponseDTO.builder()
                            .score(score)
                            .mate(mate)
                            .currentPv(currentPv)
                            .pvList(pvList)
                            .build();
                    redisPublisher.publish(channelKey, responseDTO);

                    score = null;
                    mate = null;
                    currentPv = null;
                    pvList = null;
                }

                // ⏰ 타임아웃
                if (System.currentTimeMillis() > deadline) {
                    log.error("⏰ 분석 타임아웃 발생 [channelKey={}]", channelKey);
                    break;
                }
            }
        } catch (IOException e) {
            log.error("❌ 분석 중 예외 발생 [channelKey={}]: {}", channelKey, e.getMessage(), e);
        }
    }

    /**
     * 엔진 응답에서 score 추출
     */
    private Integer extractScore(String line, String fen) {
        Pattern p = Pattern.compile("score cp (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? (getTurnByFen(fen).equals("w") ? Integer.parseInt(m.group(1)) : -Integer.parseInt(m.group(1))) : null;
    }

    /**
     * 엔진 응답에서 mate 추출
     */
    private Integer extractMate(String line, String fen) {
        Pattern p = Pattern.compile("score mate (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? (getTurnByFen(fen).equals("w") ? Integer.parseInt(m.group(1)) : -Integer.parseInt(m.group(1))) : null;
    }

    /**
     * 엔진 응답에서 multipv 추출
     */
    private Integer extractMultipv(String line) {
        Pattern p = Pattern.compile("multipv (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? Integer.parseInt(m.group(1)) : null;
    }

    /**
     * 엔진 응답에서 pv 항목들 추출
     */
    private List<String> extractPvList(String line) {
        int index = line.indexOf(" pv ");
        if (index == -1) return List.of();
        String[] tokens = line.substring(index + 4).split(" ");
        return Arrays.asList(tokens);
    }

    /**
     * fen 에서 플레이어 턴 추출
     */
    private String getTurnByFen(String fen) {
        return fen.trim().split(" ")[1];
    }
}
