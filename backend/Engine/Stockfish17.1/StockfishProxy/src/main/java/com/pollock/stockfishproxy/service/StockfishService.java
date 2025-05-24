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
    private final Map<String, StockfishEngine> engineMap = new ConcurrentHashMap<>();

    private final RedisPublisher redisPublisher;

    public void publishEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        log.info("📩 분석 요청 수신: channelKey={}", requestDTO.getChannelKey());

        StockfishEngine runningEngine = engineMap.get(requestDTO.getChannelKey());
        if (runningEngine != null) {
            runningEngine.stop();
            engineMap.remove(requestDTO.getChannelKey());
        }

        Thread thread = new Thread(() -> {
            StockfishEngine engine = null;

            try {
                engine = pool.acquire();
                engineMap.put(requestDTO.getChannelKey(), engine);
                log.info("✅ 분석 시작: PID={}, channelKey={}", engine.getEnginePid(), requestDTO.getChannelKey());

                engine.publishEngineAnalysis(
                        requestDTO.getChannelKey(),
                        requestDTO.getFen(),
                        requestDTO.getMultipv(),
                        requestDTO.getMovetime(),
                        redisPublisher);
            } catch (InterruptedException e) {
                log.warn("⚠️ 분석 스레드 인터럽트 발생: channelKey={}", requestDTO.getChannelKey(), e);
            } finally {
                if (engine != null) {
                    pool.release(engine);

                    if (engine.isInterrupted()) {
                        engine.setInterrupted(false);
                    } else {
                        engineMap.remove(requestDTO.getChannelKey());
                    }

                    log.info("🔁 엔진 반환 완료: PID={}, poolSize={}", engine.getEnginePid(), pool.getPoolSize());
                }
            }
        });

        thread.start();
    }
}
