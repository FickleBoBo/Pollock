package com.pollock.stockfishproxy.service;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.engine.StockfishEngine;
import com.pollock.stockfishproxy.engine.StockfishEnginePool;
import com.pollock.stockfishproxy.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockfishService {

    private final StockfishEnginePool pool;
    private final RedisPublisher redisPublisher;

    public void publishEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        new Thread(() -> {
            StockfishEngine engine = null;
            try {
                engine = pool.acquire();

                log.info("Engine PID: {}", engine.getEnginePid());
            } catch (InterruptedException e) {
                log.error("스톡피시 엔진 풀에서 엔진 얻기 실패: {}", e.getMessage(), e);
                throw new RuntimeException(e);
            }

            engine.publishEngineAnalysis(requestDTO.getGameId(), requestDTO.getFen(), requestDTO.getMultiPV(), requestDTO.getMoveTime(), redisPublisher);

            pool.release(engine);
        }).start();
    }
}
