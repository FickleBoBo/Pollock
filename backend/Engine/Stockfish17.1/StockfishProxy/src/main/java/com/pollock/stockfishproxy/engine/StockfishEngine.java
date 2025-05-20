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
    private final long TIMEOUT = 3000;

    public boolean start() {
        try {
            process = new ProcessBuilder(stockfishPath).start();
            br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));

            sendCommand("uci");
            if (!waitFor("uciok")) {
                return false;
            }

            sendCommand("isready");
            if (!waitFor("readyok")) {
                return false;
            }

            enginePid = process.pid();

            log.info("✅ Stockfish 프로세스 시작 완료 (PID: {})", enginePid);
            return true;
        } catch (IOException e) {
            log.error("❌ Stockfish 프로세스 시작 실패: {}", e.getMessage(), e);
            return false;
        }
    }

    public void sendCommand(String command) {
        try {
            bw.write(command + "\n");
            bw.flush();
        } catch (IOException e) {
            log.error("❌ 명령 전송 실패: '{}' → {}", command, e.getMessage(), e);
        }
    }

    public void stop() {
        log.info("PID {} stop 명령 수신", enginePid);
        sendCommand("stop");

        interrupted = true;
    }

    public boolean waitFor(String keyword) {
        long startTime = System.currentTimeMillis();

        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.contains(keyword)) return true;
                if (System.currentTimeMillis() - startTime > TIMEOUT) {
                    log.warn("⏰ '{}' 키워드 대기 중 타임아웃 발생 ({}ms)", keyword, TIMEOUT);
                    break;
                }
            }
        } catch (IOException e) {
            log.error("❌ Stockfish 응답 수신 중 오류 발생: {}", e.getMessage(), e);
        }
        return false;
    }

    public boolean quit() {
        try {
            sendCommand("quit");

            if (br != null) br.close();
            if (bw != null) bw.close();
            if (process != null) process.destroy();
        } catch (IOException e) {
            log.error("❌ Stockfish 종료 중 에러 발생: {}", e.getMessage(), e);
            return false;
        }
        return true;
    }

    public void publishEngineAnalysis(String channelKey, String fen, Integer multipv, Long movetime, RedisPublisher redisPublisher) {
        sendCommand("setoption name MultiPV value  " + multipv);
        sendCommand("position fen " + fen);
        sendCommand("go movetime " + movetime);

        Integer score = null;
        Integer mate = null;
        Integer currentPv = null;
        List<String> pvList = null;

        long start = System.currentTimeMillis();

        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.startsWith("bestmove")) break;

                // 🔁 퍼블리시
                if (line.startsWith("info")) {

                    if (line.contains("score mate")) {
                        mate = extractMate(line);
                        score = null;
                    } else if (line.contains("score cp")) {
                        score = extractScore(line);
                        mate = null;
                    }

                    if (line.contains("multipv")) {
                        currentPv = extractMultipv(line);
                    }

                    if (currentPv == null) {
                        continue;
                    }

                    if (line.contains(" pv ")) {
                        pvList = extractPvList(line);
                    }

                    EngineAnalysisResponseDTO responseDTO = EngineAnalysisResponseDTO.builder()
                            .enginePid(enginePid)
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
                if (System.currentTimeMillis() - start > movetime + TIMEOUT) {
                    log.warn("⏰ 분석 타임아웃: channelKey={}", channelKey);
                    break;
                }
            }
        } catch (IOException e) {
            log.error("❌ Stockfish 로그 읽기 실패", e);
        }
    }

    private Integer extractScore(String line) {
        Pattern p = Pattern.compile("score cp (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? Integer.parseInt(m.group(1)) : null;
    }

    private Integer extractMate(String line) {
        Pattern p = Pattern.compile("score mate (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? Integer.parseInt(m.group(1)) : null;
    }

    private Integer extractMultipv(String line) {
        Pattern p = Pattern.compile("multipv (-?\\d+)");
        Matcher m = p.matcher(line);
        return m.find() ? Integer.parseInt(m.group(1)) : null;
    }

    private List<String> extractPvList(String line) {
        int index = line.indexOf(" pv ");
        if (index == -1) return List.of();
        String[] tokens = line.substring(index + 4).split(" ");
        return Arrays.asList(tokens);
    }
}
