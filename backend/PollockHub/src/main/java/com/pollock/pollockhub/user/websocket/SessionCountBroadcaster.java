package com.pollock.pollockhub.user.websocket;

import com.pollock.pollockhub.common.exception.UserSessionRedisErrorException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import static com.pollock.pollockhub.constant.ChannelConstant.TOPIC_SESSION_COUNT;

@Component
public class SessionCountBroadcaster {

    private final StringRedisTemplate userSessionRedisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    public SessionCountBroadcaster(@Qualifier("userSessionRedisTemplate") StringRedisTemplate userSessionRedisTemplate,
                                   SimpMessagingTemplate messagingTemplate) {
        this.userSessionRedisTemplate = userSessionRedisTemplate;
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 1000)
    public void broadcastSessionCount() {
        messagingTemplate.convertAndSend(TOPIC_SESSION_COUNT, countSessionKeys());
    }

    private long countSessionKeys() {
        ScanOptions options = ScanOptions.scanOptions()
                .match("spring:session:sessions:*")
                .count(1000)
                .build();

        try (Cursor<String> cursor = userSessionRedisTemplate.scan(options)) {
            long count = 0;
            while (cursor.hasNext()) {
                cursor.next();
                count++;
            }
            return count;
        } catch (Exception e) {
            throw UserSessionRedisErrorException.getInstance();
        }
    }
}
