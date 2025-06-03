package com.pollock.pollockhub.game.websocket;

import com.pollock.pollockhub.common.exception.GameEventRedisErrorException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import static com.pollock.pollockhub.constant.ChannelConstant.TOPIC_GAME_COUNT;

@Component
public class GameCountBroadcaster {

    private final RedisTemplate<String, Object> gameEventRedisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    public GameCountBroadcaster(@Qualifier("gameEventRedisTemplate") RedisTemplate<String, Object> gameEventRedisTemplate,
                                SimpMessagingTemplate messagingTemplate) {
        this.gameEventRedisTemplate = gameEventRedisTemplate;
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 1000)
    public void broadcastGameCount() {
        messagingTemplate.convertAndSend(TOPIC_GAME_COUNT, countGameKeys());
    }

    private long countGameKeys() {
        ScanOptions options = ScanOptions.scanOptions()
                .match("game:*")
                .count(1000)
                .build();

        try (Cursor<String> cursor = gameEventRedisTemplate.scan(options)) {
            long count = 0;
            while (cursor.hasNext()) {
                cursor.next();
                count++;
            }
            return count;
        } catch (Exception e) {
            throw GameEventRedisErrorException.getInstance();
        }
    }
}
