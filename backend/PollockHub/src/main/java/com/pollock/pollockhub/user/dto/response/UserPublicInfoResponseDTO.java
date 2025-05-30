package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * 개인정보를 제외한 유저 정보 DTO
 */
@Builder
@Getter
@ToString
public class UserPublicInfoResponseDTO {

    private String nickname;
    private String profileImageUrl;
    private Integer bulletElo;
    private Integer blitzElo;
    private Integer classicalElo;
    private Integer puzzleElo;
    private Role role;
    private Title title;
    private Long followingCount;
    private Long followersCount;

    public static UserPublicInfoResponseDTO from(UserEntity userEntity, long followingCount, long followersCount) {
        return UserPublicInfoResponseDTO.builder()
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .role(userEntity.getRole())
                .title(userEntity.getTitle())
                .followingCount(followingCount)
                .followersCount(followersCount)
                .build();
    }
}
