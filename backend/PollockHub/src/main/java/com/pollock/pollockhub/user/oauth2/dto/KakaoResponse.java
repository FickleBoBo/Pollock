package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;

import java.util.Map;

import static com.pollock.pollockhub.user.entity.Gender.OTHER;
import static com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider.KAKAO;

public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return KAKAO;
    }

    @Override
    public String getOAuth2ProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public Integer getBirthyear() {
        return null;
    }

    @Override
    public Integer getBirthmonth() {
        return null;
    }

    @Override
    public Integer getBirthday() {
        return null;
    }

    @Override
    public Gender getGender() {
        return OTHER;
    }
}
