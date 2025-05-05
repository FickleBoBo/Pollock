package com.pollock.stockfishproxy.service;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.engine.StockfishEngine;
import com.pollock.stockfishproxy.engine.StockfishEnginePool;
import com.pollock.stockfishproxy.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockfishService {

    private final StockfishEnginePool pool;
    private final Map<Long, Thread> threadMap = new ConcurrentHashMap<>();
    private final RedisPublisher redisPublisher;

    public void publishEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        Thread thread = new Thread(() -> {
            StockfishEngine engine = null;

            try {
                log.info("엔진 얻기 전");
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
                engine = pool.acquire();
                log.info("엔진 얻은 후");
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());

                log.info("Engine PID: {}", engine.getEnginePid());

                engine.publishEngineAnalysis(requestDTO.getGameId(), requestDTO.getFen(), requestDTO.getMultiPV(), requestDTO.getMoveTime(), redisPublisher);

            } catch (InterruptedException e) {
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
                log.error("스톡피시 엔진 풀에서 엔진 얻기 실패: {}", e.getMessage(), e);
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());

                Thread.currentThread().interrupt();
            } finally {
                if (engine != null) {
                    log.info("finally 블록 엔진 반환 전");
                    log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
                    pool.release(engine);
                    log.info("finally 블록 엔진 반환 후");
                    log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
                }
                log.info("finally 블록2 엔진 반환 전");
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
                threadMap.remove(requestDTO.getGameId());
                log.info("finally 블록2 엔진 반환 후");
                log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
            }
        });

        log.info("map에 넣기 전");
        log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
        threadMap.put(requestDTO.getGameId(), thread);
        log.info("map에 넣은 후");
        log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
        thread.start();
    }

    public void cancelEngineAnalysis(Long gameId) {
        Thread thread = threadMap.get(gameId);

        if (thread != null && thread.isAlive()) {
            log.info("🛑 분석 중단 요청: gameId = {}", gameId);
            log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
            thread.interrupt(); // 스레드 인터럽트 요청
            log.info("pool 크기: {}, map 크기: {}", pool.getPoolSize(), threadMap.size());
        } else {
            log.warn("⚠️ 중단 요청 실패: 실행 중인 분석이 없음 (gameId = {})", gameId);
        }
    }
}
