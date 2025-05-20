package com.pollock.stockfishproxy.engine;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Slf4j
@Component
public class StockfishEnginePool {

    private final BlockingQueue<StockfishEngine> pool;

    public StockfishEnginePool(@Value("${stockfish.path}") String stockfishPath,
                               @Value("${stockfish.pool-size}") int poolSize) {
        this.pool = new LinkedBlockingQueue<>();
        log.info("🛠️ StockfishEnginePool 초기화 시작 (poolSize = {})", poolSize);

        for (int i = 0; i < poolSize; i++) {
            StockfishEngine engine = new StockfishEngine(stockfishPath);

            if (engine.start()) {
                pool.add(engine);
            } else {
                log.error("❌ StockfishEngine #{} 시작 실패", engine.getEnginePid());
            }
        }

        log.info("🎯 StockfishEnginePool 초기화 완료 (총 {}개)", pool.size());
    }

    public int getPoolSize() {
        return pool.size();
    }

    public StockfishEngine acquire() throws InterruptedException {
        return pool.take();
    }

    public void release(StockfishEngine engine) {
        pool.add(engine);
    }

    @PreDestroy
    public void shutdown() {
        for (StockfishEngine engine : pool) {
            engine.quit();
        }
    }
}
