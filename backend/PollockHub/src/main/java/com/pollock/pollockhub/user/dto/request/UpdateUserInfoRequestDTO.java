package com.pollock.pollockhub.user.dto.request;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Grade;
import lombok.Getter;

@Getter
public class UpdateUserInfoRequestDTO {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private Integer birthyear;
    private Gender gender;
    private Grade grade;
}
