package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;

import java.util.Map;
import java.util.UUID;

public class NaverResponse implements OAuth2Response {

    private static final String DEFAULT_PROFILE_IMAGE_URL = "https://avatars.githubusercontent.com/u/95597182?v=4";

    private final Map<String, Object> attributes;

    @SuppressWarnings("unchecked")
    public NaverResponse(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getOauthId() {
        return "naver-" + attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        Object email = attributes.get("email");
        return email != null ? email.toString() : null;
    }

    @Override
    public String getNickname() {
        Object nickname = attributes.get("nickname");
        return nickname != null ? nickname.toString() : "guest-" + UUID.randomUUID();
    }

    @Override
    public String getProfileImageUrl() {
        Object profileImageUrl = attributes.get("profile_image");
        return profileImageUrl != null ? profileImageUrl.toString() : DEFAULT_PROFILE_IMAGE_URL;
    }

    @Override
    public Integer getBirthyear() {
        Object birthyear = attributes.get("birthyear");
        return birthyear != null ? Integer.parseInt(birthyear.toString()) : null;
    }

    @Override
    public Gender getGender() {
        Object gender = attributes.get("gender");
        if (gender instanceof String) {
            if (gender.toString().equals("M")) return Gender.MALE;
            if (gender.toString().equals("F")) return Gender.FEMALE;
        }
        return Gender.OTHER;
    }
}
