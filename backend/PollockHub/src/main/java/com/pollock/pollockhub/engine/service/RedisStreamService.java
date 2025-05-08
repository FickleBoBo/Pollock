package com.pollock.pollockhub.engine.service;

import com.pollock.pollockhub.engine.dto.response.EngineAnalysisResponseDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.connection.stream.StreamReadOptions;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RedisStreamService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisStreamService(
            @Qualifier("engineAnalysisRedisTemplate") RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @SuppressWarnings("unchecked")
    public EngineAnalysisResponseDTO getEngineAnalysis(String streamKey, String lastId) {
        List<MapRecord<String, Object, Object>> records = redisTemplate.opsForStream()
                .read(StreamReadOptions.empty(), StreamOffset.create(streamKey, ReadOffset.from(lastId)));

        List<String> messages = new ArrayList<>();

        for (MapRecord<String, Object, Object> record : records) {
            messages.add(record.getValue().get("result").toString());
            lastId = record.getId().getValue();
        }

        return EngineAnalysisResponseDTO.builder()
                .lastId(lastId)
                .messages(messages)
                .build();
    }
}
