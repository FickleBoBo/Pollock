package com.pollock.user.oauth2.dto;

import com.pollock.user.entity.Gender;

import java.util.Map;

public class NaverResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    @SuppressWarnings("unchecked")
    public NaverResponse(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getEmail() {
        return attributes.get("email").toString();
    }

    @Override
    public String getNickname() {
        return attributes.get("nickname").toString();
    }

    @Override
    public String getProfileImageUrl() {
        return attributes.get("profile_image").toString();
    }

    @Override
    public Integer getBirthyear() {
        return Integer.parseInt(attributes.get("birthyear").toString());
    }

    @Override
    public Gender getGender() {
        String gender = attributes.get("gender").toString();

        if (gender.equals("M")) {
            return Gender.MALE;
        } else if (gender.equals("F")) {
            return Gender.FEMALE;
        } else {
            return Gender.OTHER;
        }
    }
}
