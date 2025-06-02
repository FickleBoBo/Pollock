package com.pollock.pollockhub.user.dto.request;

import com.pollock.pollockhub.user.entity.Gender;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdateUserProfileRequestDTO {

    private String email;
    private Integer birthyear;
    private Integer birthmonth;
    private Integer birthday;
    private Gender gender;
    private String profileImageUrl;
    private String nickname;
}
