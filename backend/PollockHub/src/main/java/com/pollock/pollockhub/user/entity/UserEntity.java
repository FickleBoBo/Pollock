package com.pollock.pollockhub.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {

    private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
    private String nickname;

    @Column(nullable = false)
    private String profileImageUrl;

    @Column(nullable = false)
    private Integer bulletElo;

    @Column(nullable = false)
    private Integer blitzElo;

    @Column(nullable = false)
    private Integer classicalElo;

    @Column(nullable = false)
    private Integer puzzleElo;

    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Grade grade;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    @Builder
    public UserEntity(String oauthId, String email, Integer birthyear, Gender gender) {
        this.oauthId = oauthId;
        this.email = email;
        this.nickname = generateBase62Nickname();
        this.profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
        this.bulletElo = DEFAULT_ELO;
        this.blitzElo = DEFAULT_ELO;
        this.classicalElo = DEFAULT_ELO;
        this.puzzleElo = DEFAULT_ELO;
        this.birthyear = birthyear;
        this.gender = gender == null ? Gender.OTHER : gender;
        this.grade = Grade.BASIC;
    }

    public void update(String email, String nickname, String profileImageUrl, Integer birthyear, Gender gender, Grade grade) {
        if (email != null) this.email = email;
        if (nickname != null) this.nickname = nickname;
        if (profileImageUrl != null) this.profileImageUrl = profileImageUrl;
        if (birthyear != null) this.birthyear = birthyear;
        if (gender != null) this.gender = gender;
        if (grade != null) this.grade = grade;
    }

    private static String generateBase62Nickname() {
        StringBuilder sb = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 12; i++) {
            int index = random.nextInt(BASE62.length());
            sb.append(BASE62.charAt(index));
        }
        return sb.toString();
    }
}
