package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;

/**
 * 개인정보를 제외한 유저 정보 DTO
 */
@Builder
@Getter
public class UserSimpleInfoResponseDTO {

    private String nickname;
    private String profileImageUrl;
    private Integer bulletElo;
    private Integer blitzElo;
    private Integer classicalElo;
    private Integer puzzleElo;
    private Role role;
    private Title title;
    private Integer followingCount;
    private Integer followersCount;

    /**
     * UserEntity -> UserSimpleInfoResponseDTO 정적 팩터리 메서드
     */
    public static UserSimpleInfoResponseDTO from(UserEntity userEntity) {
        return UserSimpleInfoResponseDTO.builder()
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .role(userEntity.getRole())
                .title(userEntity.getTitle())
                .followingCount(userEntity.getFollowing().size())
                .followersCount(userEntity.getFollowers().size())
                .build();
    }
}
