package com.pollock.pollockhub.game.entity;

import com.pollock.pollockhub.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer gameType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameResult result;

    @ManyToOne
    @JoinColumn(name = "black_user_id", nullable = false)
    private UserEntity blackUser;

    @ManyToOne
    @JoinColumn(name = "white_user_id", nullable = false)
    private UserEntity whiteUser;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public GameEntity(Integer gameType, GameResult result, UserEntity blackUser, UserEntity whiteUser) {
        this.gameType = gameType;
        this.result = result;
        this.blackUser = blackUser;
        this.whiteUser = whiteUser;
    }
}
