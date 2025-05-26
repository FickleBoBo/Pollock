package com.pollock.pollockhub.user.dto.request;

import com.pollock.pollockhub.user.entity.Gender;
import lombok.Getter;

@Getter
public class UpdateUserProfileRequestDTO {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private Integer birthyear;
    private Gender gender;
}
