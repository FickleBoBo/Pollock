package com.pollock.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String nickname;

    private String birthyear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Grade grade;

    @Builder
    public UserEntity(String email, String nickname, String birthyear, Gender gender) {
        this.email = email;
        this.nickname = nickname;
        this.birthyear = birthyear;
        this.gender = gender == null ? Gender.OTHER : gender;
        this.grade = Grade.BASIC;
    }
}
