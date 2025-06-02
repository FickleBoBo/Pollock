package com.pollock.pollockhub.user.entity;

import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import static com.pollock.pollockhub.constant.Constant.DEFAULT_ELO;
import static com.pollock.pollockhub.user.entity.Role.BASIC;
import static com.pollock.pollockhub.user.entity.Title.NONE;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "oauth2_provider", nullable = false)
    private OAuth2Provider oAuth2Provider;

    @Column(name = "oauth2_provider_id", nullable = false)
    private String oAuth2ProviderId;

    @Column(name = "email")
    private String email;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "profile_image_url", nullable = false)
    private String profileImageUrl;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "title", nullable = false)
    private Title title;

    @Column(name = "bullet_elo", nullable = false)
    private int bulletElo;

    @Column(name = "blitz_elo", nullable = false)
    private int blitzElo;

    @Column(name = "rapid_elo", nullable = false)
    private int rapidElo;

    @Column(name = "classical_elo", nullable = false)
    private int classicalElo;

    @Column(name = "puzzle_elo", nullable = false)
    private int puzzleElo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    @OneToMany(mappedBy = "follower")
    private List<FollowEntity> following;

    @OneToMany(mappedBy = "followee")
    private List<FollowEntity> followers;

    @Column(name = "following_count", nullable = false)
    private long followingCount;

    @Column(name = "follower_count", nullable = false)
    private long followerCount;

    @Builder
    public UserEntity(
            OAuth2Provider oAuth2Provider,
            String oAuth2ProviderId,
            String email,
            Integer birthyear,
            Integer birthmonth,
            Integer birthday,
            Gender gender,
            String profileImageUrl,
            String nickname
    ) {
        this.oAuth2Provider = oAuth2Provider;
        this.oAuth2ProviderId = oAuth2ProviderId;
        this.email = email;
        this.birthdate = (birthyear != null && birthmonth != null && birthday != null)
                ? LocalDate.of(birthyear, birthmonth, birthday)
                : null;
        this.gender = gender;
        this.profileImageUrl = profileImageUrl;
        this.nickname = nickname;
        this.role = BASIC;
        this.title = NONE;
        this.bulletElo = DEFAULT_ELO;
        this.blitzElo = DEFAULT_ELO;
        this.rapidElo = DEFAULT_ELO;
        this.classicalElo = DEFAULT_ELO;
        this.puzzleElo = DEFAULT_ELO;
        this.followingCount = 0L;
        this.followerCount = 0L;
    }

    public void updateProfile(
            String email,
            Integer birthyear,
            Integer birthmonth,
            Integer birthday,
            Gender gender,
            String profileImageUrl,
            String nickname
    ) {
        this.email = email;
        this.birthdate = (birthyear != null && birthmonth != null && birthday != null)
                ? LocalDate.of(birthyear, birthmonth, birthday)
                : null;
        this.gender = gender;
        this.profileImageUrl = profileImageUrl;
        this.nickname = nickname;
    }

    public void updateBulletElo(int bulletElo) {
        this.bulletElo = bulletElo;
    }

    public void updateBlitzElo(int blitzElo) {
        this.blitzElo = blitzElo;
    }

    public void updateRapidElo(int rapidElo) {
        this.rapidElo = rapidElo;
    }

    public void updateClassicalElo(int classicalElo) {
        this.classicalElo = classicalElo;
    }

    public void updatePuzzleElo(int puzzleElo) {
        this.puzzleElo = puzzleElo;
    }

    public void changeRole(Role role) {
        this.role = role;
    }

    public void changeTitle(Title title) {
        this.title = title;
    }

    public void increaseFollowingCount() {
        this.followingCount++;
    }

    public void decreaseFollowingCount() {
        this.followingCount--;
    }

    public void increaseFollowerCount() {
        this.followerCount++;
    }

    public void decreaseFollowerCount() {
        this.followerCount--;
    }
}
