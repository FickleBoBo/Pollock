package com.pollock.user.oauth2.dto;

import com.pollock.user.entity.Gender;

public interface OAuth2Response {

    String getEmail();

    String getNickname();

    String getProfileImageUrl();

    Integer getBirthyear();

    Gender getGender();
}
