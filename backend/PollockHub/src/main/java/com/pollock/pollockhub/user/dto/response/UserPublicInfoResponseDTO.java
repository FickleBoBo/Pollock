package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

/**
 * 개인정보를 제외한 유저 정보 DTO
 */
@Builder
@Getter
@ToString
public class UserPublicInfoResponseDTO {

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

    public static UserPublicInfoResponseDTO from(UserEntity userEntity) {
        return UserPublicInfoResponseDTO.builder()
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
                .followingCount(userEntity.getFollowingCount())
                .followersCount(userEntity.getFollowersCount())
                .build();
    }
}
