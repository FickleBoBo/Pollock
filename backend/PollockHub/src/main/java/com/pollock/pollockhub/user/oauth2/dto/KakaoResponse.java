package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getOauthId() {
        return "kakao-" + attributes.get("id").toString();
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
    public Gender getGender() {
        return Gender.OTHER;
    }
}
