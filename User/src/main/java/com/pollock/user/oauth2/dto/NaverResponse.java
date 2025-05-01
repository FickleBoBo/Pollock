package com.pollock.user.oauth2.dto;

import com.pollock.user.entity.Gender;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class NaverResponse implements OAuth2Response {

    private final Map<String, Object> attribute;

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    @Override
    public String getBirthyear() {
        return attribute.get("birthyear").toString();
    }

    @Override
    public Gender getGender() {
        String gender = attribute.get("gender").toString();

        if (gender.equals("M")) {
            return Gender.MALE;
        } else if (gender.equals("F")) {
            return Gender.FEMALE;
        } else {
            return Gender.OTHER;
        }
    }
}
