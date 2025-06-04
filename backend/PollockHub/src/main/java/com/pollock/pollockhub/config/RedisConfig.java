package com.pollock.pollockhub.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Primary
    @Bean(name = "userSessionRedisConnectionFactory")
    public RedisConnectionFactory userSessionRedisConnectionFactory(
            @Value("${spring.data.redis.host}") String host,
            @Value("${spring.data.redis.port}") int port) {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean(name = "userSessionRedisTemplate")
    public StringRedisTemplate userSessionRedisTemplate(
            @Qualifier("userSessionRedisConnectionFactory") RedisConnectionFactory factory) {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(factory);
        return template;
    }

    @Bean(name = "gameEventRedisConnectionFactory")
    public RedisConnectionFactory gameEventRedisConnectionFactory(
            @Value("${custom.game-event.redis.host}") String host,
            @Value("${custom.game-event.redis.port}") int port) {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean(name = "gameEventRedisTemplate")
    public RedisTemplate<String, Object> gameEventRedisTemplate(
            @Qualifier("gameEventRedisConnectionFactory") RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return redisTemplate;
    }

    @Bean(name = "matchEventRedisConnectionFactory")
    public RedisConnectionFactory matchEventRedisConnectionFactory(
            @Value("${custom.match-event.redis.host}") String host,
            @Value("${custom.match-event.redis.port}") int port) {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean(name = "matchEventRedisTemplate")
    public StringRedisTemplate matchEventRedisTemplate(
            @Qualifier("matchEventRedisConnectionFactory") RedisConnectionFactory factory) {
        StringRedisTemplate redisTemplate = new StringRedisTemplate();
        redisTemplate.setConnectionFactory(factory);
        return redisTemplate;
    }

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
