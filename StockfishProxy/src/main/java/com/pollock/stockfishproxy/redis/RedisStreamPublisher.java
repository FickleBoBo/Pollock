package com.pollock.stockfishproxy.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class RedisStreamPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(String streamKey, String line) {
        redisTemplate.opsForStream().add(streamKey, Map.of("result", line));
    }
}
