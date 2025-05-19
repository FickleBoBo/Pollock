package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Grade;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfo {

    private String nickname;
    private String profileImageUrl;
    private Integer elo;
    private Grade grade;

    public static UserInfo from(UserEntity userEntity) {
        return UserInfo.builder()
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .elo(userEntity.getElo())
                .grade(userEntity.getGrade())
                .build();
    }
}
