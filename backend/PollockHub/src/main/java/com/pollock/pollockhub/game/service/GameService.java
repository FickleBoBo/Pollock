package com.pollock.pollockhub.game.service;

import com.pollock.pollockhub.game.enums.GameType;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.service.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import static com.pollock.pollockhub.constant.ChannelConstant.MATCH_KEY;
import static com.pollock.pollockhub.constant.Constant.ELO_BUCKET_SIZE;

@Service
public class GameService {

    private final UserService userService;
    private final StringRedisTemplate matchEventRedisTemplate;

    public GameService(UserService userService,
                       @Qualifier("matchEventRedisTemplate") StringRedisTemplate matchEventRedisTemplate) {
        this.userService = userService;
        this.matchEventRedisTemplate = matchEventRedisTemplate;
    }

    public void enqueueUser(CustomOAuth2User user, GameType gameType) {
        int eloBucket = userService.getEloByGameType(user, gameType) / ELO_BUCKET_SIZE * ELO_BUCKET_SIZE;

        String queueKey = String.format(MATCH_KEY, gameType, eloBucket);
        matchEventRedisTemplate.opsForList().rightPush(queueKey, user.getNickname());
    }
}
