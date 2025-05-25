package com.pollock.pollockhub.websocket.broadcaster;

import com.pollock.pollockhub.common.exception.UserSessionRedisErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionCountBroadcaster {

    private final StringRedisTemplate userSessionRedisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    @Scheduled(fixedRate = 1000)
    public void broadcastSessionCount() {
        long count = countSessionKeys();
        messagingTemplate.convertAndSend("/topic/sessions", count);
    }

    private long countSessionKeys() {
        ScanOptions options = ScanOptions.scanOptions()
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
