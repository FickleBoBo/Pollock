package com.pollock.stockfishproxy.service;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.engine.StockfishEngine;
import com.pollock.stockfishproxy.engine.StockfishEnginePool;
import com.pollock.stockfishproxy.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockfishService {

    private final StockfishEnginePool pool;
    private final RedisPublisher redisPublisher;

    public void publishEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        Thread thread = new Thread(() -> {
            StockfishEngine engine = null;

            try {
                pool.stopEngine(requestDTO.getChannelKey());

                engine = pool.acquire(requestDTO.getChannelKey());

                engine.publishEngineAnalysis(
                        requestDTO.getChannelKey(),
                        requestDTO.getFen(),
                        requestDTO.getMultipv(),
                        requestDTO.getMovetime(),
                        redisPublisher);
            } catch (InterruptedException e) {
                return;
            } finally {
                if (engine != null) {
                    pool.release(requestDTO.getChannelKey(), engine);
                }
            }
        });

        thread.start();
    }
}
