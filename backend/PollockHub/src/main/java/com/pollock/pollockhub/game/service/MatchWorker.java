package com.pollock.pollockhub.game.service;

import com.pollock.pollockhub.game.entity.GameType;
import com.pollock.pollockhub.game.websocket.MatchEventBroadcaster;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.pollock.pollockhub.constant.ChannelConstant.MATCH_KEY;
import static com.pollock.pollockhub.constant.Constant.ELO_BUCKET_SIZE;

@Service
public class MatchWorker {

    private final RedisTemplate<String, Object> gameEventRedisTemplate;
    private final StringRedisTemplate matchEventRedisTemplate;
    private final MatchEventBroadcaster matchEventBroadcaster;

    public MatchWorker(@Qualifier("gameEventRedisTemplate") RedisTemplate<String, Object> gameEventRedisTemplate,
                       @Qualifier("matchEventRedisTemplate") StringRedisTemplate matchEventRedisTemplate,
                       MatchEventBroadcaster matchEventBroadcaster) {
        this.gameEventRedisTemplate = gameEventRedisTemplate;
        this.matchEventRedisTemplate = matchEventRedisTemplate;
        this.matchEventBroadcaster = matchEventBroadcaster;
    }

    @Scheduled(fixedRate = 3000)
    public void matchEvents() {
        for (GameType gameType : GameType.values()) {
            for (int eloBucket = 0; eloBucket <= 3000; eloBucket += ELO_BUCKET_SIZE) {
                String queueKey = String.format(MATCH_KEY, gameType, eloBucket);
                Long size = matchEventRedisTemplate.opsForList().size(queueKey);

                if (size == null) continue;

                while (size >= 2) {
                    String user1 = matchEventRedisTemplate.opsForList().leftPop(queueKey);
                    String user2 = matchEventRedisTemplate.opsForList().leftPop(queueKey);
                    size -= 2;

                    String gameId = UUID.randomUUID().toString();

                    matchEventBroadcaster.broadcastMatch(user1, gameId);
                    matchEventBroadcaster.broadcastMatch(user2, gameId);
                }
            }
        }
    }
}
