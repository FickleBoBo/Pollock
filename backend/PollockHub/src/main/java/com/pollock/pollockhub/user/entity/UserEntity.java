package com.pollock.pollockhub.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String nickname;

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

    @Builder
    public UserEntity(String email, String nickname, String profileImageUrl, Integer birthyear, Gender gender) {
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.bulletElo = 400;
        this.blitzElo = 400;
        this.classicalElo = 400;
        this.puzzleElo = 400;
        this.birthyear = birthyear;
        this.gender = gender == null ? Gender.OTHER : gender;
        this.grade = Grade.BASIC;
    }
}
