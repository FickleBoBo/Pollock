package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;

import java.util.Map;
import java.util.UUID;

public class KakaoResponse implements OAuth2Response {

    private static final String DEFAULT_PROFILE_IMAGE_URL = "https://avatars.githubusercontent.com/u/95597182?v=4";

    private final Map<String, Object> attributes;
    private final Map<String, Object> kakaoAccount;
    private final Map<String, Object> profile;

    @SuppressWarnings("unchecked")
    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.profile = (Map<String, Object>) kakaoAccount.get("profile");
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
    public String getNickname() {
        Object nickname = profile.get("nickname");
        return nickname != null ? nickname.toString() : "guest-" + UUID.randomUUID();
    }

    @Override
    public String getProfileImageUrl() {
        Object profileImageUrl = profile.get("profile_image_url");
        return profileImageUrl != null ? profileImageUrl.toString() : DEFAULT_PROFILE_IMAGE_URL;
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
