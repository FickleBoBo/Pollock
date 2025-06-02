package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 개인정보를 포함한 유저 정보 DTO
 */
@Builder
@Getter
@ToString
public class UserPrivateInfoResponseDTO {

    private String email;
    private LocalDate birthdate;
    private Gender gender;
    private String profileImageUrl;
    private String nickname;
    private Role role;
    private Title title;
    private int bulletElo;
    private int blitzElo;
    private int rapidElo;
    private int classicalElo;
    private int puzzleElo;
    private LocalDateTime createdAt;
    private long followingCount;
    private long followersCount;

    public static UserPrivateInfoResponseDTO from(UserEntity userEntity, long followingCount, long followersCount) {
        return UserPrivateInfoResponseDTO.builder()
                .email(userEntity.getEmail())
                .birthdate(userEntity.getBirthdate())
                .gender(userEntity.getGender())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .nickname(userEntity.getNickname())
                .role(userEntity.getRole())
                .title(userEntity.getTitle())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .rapidElo(userEntity.getRapidElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .createdAt(userEntity.getCreatedAt())
                .followingCount(followingCount)
                .followersCount(followersCount)
                .build();
    }
}
