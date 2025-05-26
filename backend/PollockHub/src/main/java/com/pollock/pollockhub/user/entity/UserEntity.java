package com.pollock.pollockhub.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.pollock.pollockhub.user.entity.Role.BASIC;
import static com.pollock.pollockhub.user.entity.Title.NONE;
import static com.pollock.pollockhub.user.util.NicknameGenerator.randomNicknameGenerator;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {

    private static final String DEFAULT_PROFILE_IMAGE_URL = "https://avatars.githubusercontent.com/u/95597182?v=4";
    private static final int DEFAULT_ELO = 600;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String oauthId;

    @Column
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname = randomNicknameGenerator();

    @Column(nullable = false)
    private String profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;

    @Column(nullable = false)
    private Integer bulletElo = DEFAULT_ELO;

    @Column(nullable = false)
    private Integer blitzElo = DEFAULT_ELO;

    @Column(nullable = false)
    private Integer classicalElo = DEFAULT_ELO;

    @Column(nullable = false)
    private Integer puzzleElo = DEFAULT_ELO;

    @Column
    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = BASIC;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Title title = NONE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column
    private List<FollowEntity> following = new ArrayList<>();

    @OneToMany(mappedBy = "followee", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column
    private List<FollowEntity> followers = new ArrayList<>();

    @Builder
    public UserEntity(String oauthId, String email, Integer birthyear, Gender gender) {
        this.oauthId = oauthId;
        this.email = email;
        this.birthyear = birthyear;
        this.gender = gender == null ? Gender.OTHER : gender;
    }

    public void updateProfile(String email, String nickname, String profileImageUrl, Integer birthyear, Gender gender) {
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl == null ? DEFAULT_PROFILE_IMAGE_URL : profileImageUrl;
        this.birthyear = birthyear;
        this.gender = gender;
    }

    public void updateBulletElo(Integer bulletElo) {
        this.bulletElo = bulletElo;
    }

    public void updateBlitzElo(Integer blitzElo) {
        this.blitzElo = blitzElo;
    }

    public void updateClassicalElo(Integer classicalElo) {
        this.classicalElo = classicalElo;
    }

    public void updatePuzzleElo(Integer puzzleElo) {
        this.puzzleElo = puzzleElo;
    }

    public void changeRole(Role role) {
        this.role = role;
    }

    public void changeTitle(Title title) {
        this.title = title;
    }
}
