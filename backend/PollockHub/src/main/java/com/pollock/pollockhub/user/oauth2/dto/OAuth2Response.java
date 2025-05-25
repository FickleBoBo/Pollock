package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;

public interface OAuth2Response {

    String getOauthId();

    String getEmail();

    String getNickname();

    String getProfileImageUrl();

    Integer getBirthyear();

    Gender getGender();
}
