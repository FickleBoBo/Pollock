package com.pollock.pollockhub.game.dto.response;

import com.pollock.pollockhub.game.entity.GameEntity;
import com.pollock.pollockhub.game.entity.GameResult;
import com.pollock.pollockhub.game.entity.GameType;
import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@Getter
@ToString
public class GameInfoResponseDTO {

    private Long id;
    private String whiteUserProfileImageUrl;
    private String blackUserProfileImageUrl;
    private String whiteUserNickname;
    private String blackUserNickname;
    private Role whiteUserRole;
    private Role blackUserRole;
    private Title whiteUserTitle;
    private Title blackUserTitle;
    private int whiteUserElo;
    private int blackUserElo;
    private int whiteUserEloDiff;
    private int blackUserEloDiff;
    private GameType gameType;
    private GameResult gameResult;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;

    public static GameInfoResponseDTO from(GameEntity gameEntity) {
        return GameInfoResponseDTO.builder()
                .id(gameEntity.getId())
                .whiteUserProfileImageUrl(gameEntity.getWhiteUser().getProfileImageUrl())
                .blackUserProfileImageUrl(gameEntity.getBlackUser().getProfileImageUrl())
                .whiteUserNickname(gameEntity.getWhiteUser().getNickname())
                .blackUserNickname(gameEntity.getBlackUser().getNickname())
                .whiteUserRole(gameEntity.getWhiteUser().getRole())
                .blackUserRole(gameEntity.getBlackUser().getRole())
                .whiteUserTitle(gameEntity.getWhiteUser().getTitle())
                .blackUserTitle(gameEntity.getBlackUser().getTitle())
                .whiteUserElo(gameEntity.getWhiteUserElo())
                .blackUserElo(gameEntity.getBlackUserElo())
                .whiteUserEloDiff(gameEntity.getWhiteUserEloDiff())
                .blackUserEloDiff(gameEntity.getBlackUserEloDiff())
                .gameType(gameEntity.getGameType())
                .gameResult(gameEntity.getGameResult())
                .startedAt(gameEntity.getStartedAt())
                .endedAt(gameEntity.getEndedAt())
                .build();
    }
}
