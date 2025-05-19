package com.pollock.pollockhub.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean(name = "engineAnalysisRedisConnectionFactory")
    public RedisConnectionFactory engineAnalysisRedisConnectionFactory(
            @Value("${custom.engine-analysis.redis.host}") String host,
            @Value("${custom.engine-analysis.redis.port}") int port) {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean(name = "engineAnalysisRedisTemplate")
    public RedisTemplate<String, Object> engineAnalysisRedisTemplate(
            @Qualifier("engineAnalysisRedisConnectionFactory") RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return redisTemplate;
    }
}
