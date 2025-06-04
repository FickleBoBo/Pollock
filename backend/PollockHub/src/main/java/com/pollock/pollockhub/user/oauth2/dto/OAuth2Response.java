package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;

public interface OAuth2Response {

    OAuth2Provider getOAuth2Provider();

    String getOAuth2ProviderId();

    String getEmail();

    Integer getBirthyear();

    Integer getBirthmonth();

    Integer getBirthday();

    Gender getGender();
}
