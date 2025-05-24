package com.pollock.stockfishproxy.engine;

import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

@Component
public class StockfishEnginePool {

    private final BlockingQueue<StockfishEngine> pool;
    private final Map<String, StockfishEngine> runningEngineMap;

    public StockfishEnginePool(@Value("${stockfish.path}") String stockfishPath,
                               @Value("${stockfish.pool-size}") int poolSize) {
        this.pool = new LinkedBlockingQueue<>();
        this.runningEngineMap = new ConcurrentHashMap<>();

        for (int i = 0; i < poolSize; i++) {
            StockfishEngine engine = new StockfishEngine(stockfishPath);

            if (engine.start()) {
                pool.add(engine);
            }
        }
    }

    public int getPoolSize() {
        return pool.size();
    }

    public StockfishEngine acquire(String key) throws InterruptedException {
        StockfishEngine engine = pool.take();
        runningEngineMap.put(key, engine);
        return engine;
    }

    public void release(String key, StockfishEngine engine) {
        if (engine.isInterrupted()) {
            engine.setInterrupted(false);
        } else {
            runningEngineMap.remove(key);
        }
        pool.add(engine);
    }

    public void stopEngine(String key) {
        StockfishEngine engine = runningEngineMap.get(key);
        if (engine != null) {
            engine.stop();
            runningEngineMap.remove(key);
        }
    }

    @PreDestroy
    private void shutdown() {
        for (StockfishEngine engine : pool) {
            engine.quit();
        }
    }
}
