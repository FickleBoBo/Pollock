package com.pollock.user.oauth2.dto;

import com.pollock.user.entity.Gender;

import java.util.Map;

public class NaverResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    public NaverResponse(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getEmail() {
        return attributes.get("email").toString();
    }

    @Override
    public String getName() {
        return attributes.get("name").toString();
    }

    @Override
    public String getBirthyear() {
        return attributes.get("birthyear").toString();
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
