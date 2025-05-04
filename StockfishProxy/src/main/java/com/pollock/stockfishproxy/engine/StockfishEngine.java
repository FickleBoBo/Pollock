package com.pollock.stockfishproxy.engine;

import com.pollock.stockfishproxy.redis.RedisPublisher;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.io.*;

@Slf4j
public class StockfishEngine {

    private Process process;
    private BufferedReader br;
    private BufferedWriter bw;

    @Getter
    private long enginePid;

    private final String stockfishPath;

    private final long TIMEOUT = 1000;

    public StockfishEngine(String stockfishPath) {
        this.stockfishPath = stockfishPath;
    }

    public boolean start() {
        try {
            process = new ProcessBuilder(stockfishPath).start();
            br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));

            sendCommand("uci");
            if (!waitFor("uciok")) {
                log.error("❌ Stockfish 응답 없음: 'uciok' 누락");
                return false;
            }

            sendCommand("isready");
            if (!waitFor("readyok")) {
                log.error("❌ Stockfish 응답 없음: 'readyok' 누락");
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

    public void publishEngineAnalysis(Long gameId, String fen, Integer multiPV, Long moveTime, RedisPublisher redisPublisher) {
        sendCommand("setoption name MultiPV value  " + multiPV);
        sendCommand("position fen " + fen);
        sendCommand("go movetime " + moveTime);

        long start = System.currentTimeMillis();
        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.startsWith("info") || line.startsWith("bestmove")) {
                    log.info("📤 Redis Publish to '{}' → {}", gameId, line);
                    redisPublisher.publish(gameId.toString(), line);
                    if (line.startsWith("bestmove")) break;
                }

                if (System.currentTimeMillis() - start > moveTime + 1000) {
                    log.warn("⏰ 분석 타임아웃");
                    break;
                }
            }
        } catch (IOException e) {
            log.error("❌ Stockfish 로그 읽기 실패", e);
        }
    }

    public String readCommand(String keyword, long moveTime) {
        long start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();

        try {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");

                if (line.contains(keyword)) break;
                if (System.currentTimeMillis() - start > moveTime + TIMEOUT) {
                    log.warn("⏰ Timeout waiting for keyword '{}'", keyword);
                    break;
                }
            }
        } catch (IOException e) {
            log.error("❌ Error reading from Stockfish: {}", e.getMessage(), e);
        }

        return sb.toString().trim();
    }
}
