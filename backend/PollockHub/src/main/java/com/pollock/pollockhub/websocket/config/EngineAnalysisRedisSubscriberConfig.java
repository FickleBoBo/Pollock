package com.pollock.pollockhub.websocket.config;

import com.pollock.pollockhub.websocket.subscriber.engine_analysis.EngineAnalysisRedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;

@Configuration
@RequiredArgsConstructor
public class EngineAnalysisRedisSubscriberConfig {

    private final EngineAnalysisRedisSubscriber subscriber;

    @Bean
    public RedisMessageListenerContainer engineAnalysisListenerContainer(
            @Qualifier("engineAnalysisRedisConnectionFactory") RedisConnectionFactory connectionFactory) {

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(subscriber, new PatternTopic("engine:*"));
        return container;
    }
}
