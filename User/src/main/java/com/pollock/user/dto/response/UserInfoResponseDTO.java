package com.pollock.user.dto.response;

import com.pollock.user.entity.Gender;
import com.pollock.user.entity.Grade;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfoResponseDTO {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private String birthyear;
    private Gender gender;
    private Grade grade;
}
