package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 개인정보를 포함한 유저 정보 DTO
 */
@Builder
@Getter
public class UserInfoResponseDTO {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private Integer bulletElo;
    private Integer blitzElo;
    private Integer classicalElo;
    private Integer puzzleElo;
    private Integer birthyear;
    private Gender gender;
    private Role role;
    private Title title;
    private LocalDateTime createdAt;
    private Long followingCount;
    private Long followersCount;

    public static UserInfoResponseDTO from(UserEntity userEntity, long followingCount, long followersCount) {
        return UserInfoResponseDTO.builder()
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .birthyear(userEntity.getBirthyear())
                .gender(userEntity.getGender())
                .role(userEntity.getRole())
                .title(userEntity.getTitle())
                .createdAt(userEntity.getCreatedAt())
                .followingCount(followingCount)
                .followersCount(followersCount)
                .build();
    }
}
