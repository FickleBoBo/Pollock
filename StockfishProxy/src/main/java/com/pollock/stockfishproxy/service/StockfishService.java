package com.pollock.stockfishproxy.service;

import com.pollock.stockfishproxy.engine.StockfishEngine;
import com.pollock.stockfishproxy.engine.StockfishEnginePool;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockfishService {

    private final StockfishEnginePool pool;

    public String getEngineAnalyze(String fen) {
        StockfishEngine engine = null;
        try {
            engine = pool.acquire();
        } catch (InterruptedException e) {
            log.error("스톡피시 엔진 풀에서 엔진 얻기 실패: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }

        log.info("Engine PID: {}", engine.getEnginePid());

        String engineAnalyze = engine.go(fen);

        pool.release(engine);

        return engineAnalyze;
    }
}
