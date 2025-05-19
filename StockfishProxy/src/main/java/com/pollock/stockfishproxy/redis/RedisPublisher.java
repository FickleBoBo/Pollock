package com.pollock.stockfishproxy.redis;

import com.pollock.stockfishproxy.dto.response.EngineAnalysisResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(String channelKey, EngineAnalysisResponseDTO resultDTO) {
        String channel = "engine:" + channelKey;

        redisTemplate.convertAndSend(channel, resultDTO);
        log.info("📡 Redis 퍼블리시 완료 - channel: {}, message: {}", channel, resultDTO);
    }
}
