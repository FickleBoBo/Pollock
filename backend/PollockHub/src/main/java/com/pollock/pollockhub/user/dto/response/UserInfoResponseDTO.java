package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Grade;
import lombok.Builder;
import lombok.Getter;

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
    private Grade grade;
}
