package com.pollock.stockfishproxy.redis;

import com.pollock.stockfishproxy.dto.response.EngineAnalysisResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(String channelKey, EngineAnalysisResponseDTO resultDTO) {
        String channel = "engine:" + channelKey;

        redisTemplate.convertAndSend(channel, resultDTO);
    }
}
