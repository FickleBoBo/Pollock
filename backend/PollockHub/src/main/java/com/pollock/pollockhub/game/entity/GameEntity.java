package com.pollock.pollockhub.game.entity;

import com.pollock.pollockhub.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "game")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "white_user_id", nullable = false)
    private UserEntity whiteUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "black_user_id", nullable = false)
    private UserEntity blackUser;

    @Column(name = "white_user_elo", nullable = false)
    private int whiteUserElo;

    @Column(name = "black_user_elo", nullable = false)
    private int blackUserElo;

    @Column(name = "white_user_elo_diff", nullable = false)
    private int whiteUserEloDiff;

    @Column(name = "black_user_elo_diff", nullable = false)
    private int blackUserEloDiff;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_type", nullable = false)
    private GameType gameType;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_result", nullable = false)
    private GameResult gameResult;

    @Column(name = "started_at", nullable = false, updatable = false)
    private LocalDateTime startedAt;

    @PrePersist
    protected void onCreate() {
        this.startedAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    @Column(name = "ended_at", nullable = false)
    private LocalDateTime endedAt;

    @Builder
    public GameEntity(UserEntity whiteUser,
                      UserEntity blackUser,
                      int whiteUserElo,
                      int blackUserElo,
                      GameType gameType
    ) {
        this.whiteUser = whiteUser;
        this.blackUser = blackUser;
        this.whiteUserElo = whiteUserElo;
        this.blackUserElo = blackUserElo;
        this.gameType = gameType;
    }

    public void gameEnded(int whiteUserEloDiff,
                          int blackUserEloDiff,
                          GameResult gameResult
    ) {
        this.whiteUserEloDiff = whiteUserEloDiff;
        this.blackUserEloDiff = blackUserEloDiff;
        this.gameResult = gameResult;
        this.endedAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }
}
