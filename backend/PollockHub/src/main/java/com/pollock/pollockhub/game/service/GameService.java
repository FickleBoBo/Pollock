package com.pollock.pollockhub.game.service;

import com.pollock.pollockhub.game.dto.response.GameInfoResponseDTO;
import com.pollock.pollockhub.game.entity.GameEntity;
import com.pollock.pollockhub.game.entity.GameType;
import com.pollock.pollockhub.game.exception.GameNotFoundException;
import com.pollock.pollockhub.game.repository.GameRepository;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.service.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import static com.pollock.pollockhub.constant.ChannelConstant.MATCH_KEY;
import static com.pollock.pollockhub.constant.Constant.ELO_BUCKET_SIZE;

@Service
public class GameService {

    private final UserService userService;
    private final GameRepository gameRepository;
    private final StringRedisTemplate matchEventRedisTemplate;

    public GameService(UserService userService,
                       GameRepository gameRepository,
                       @Qualifier("matchEventRedisTemplate") StringRedisTemplate matchEventRedisTemplate) {
        this.userService = userService;
        this.gameRepository = gameRepository;
        this.matchEventRedisTemplate = matchEventRedisTemplate;
    }

    public void enqueueUser(CustomOAuth2User user, GameType gameType) {
        int eloBucket = userService.getEloByGameType(user, gameType) / ELO_BUCKET_SIZE * ELO_BUCKET_SIZE;

        String queueKey = String.format(MATCH_KEY, gameType, eloBucket);
        matchEventRedisTemplate.opsForList().rightPush(queueKey, user.getNickname());
    }

    public Page<GameInfoResponseDTO> getGames(Pageable pageable) {
        return gameRepository.findAll(pageable)
                .map(GameInfoResponseDTO::from);
    }

    public GameInfoResponseDTO getGame(Long gameId) {
        return GameInfoResponseDTO.from(getGameEntity(gameId));
    }

    private GameEntity getGameEntity(Long id) {
        return gameRepository.findById(id).orElseThrow(GameNotFoundException::getInstance);
    }
}
