package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;

import java.util.Map;
import java.util.Optional;

import static com.pollock.pollockhub.user.entity.Gender.*;
import static com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider.NAVER;

public class NaverResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    @SuppressWarnings("unchecked")
    public NaverResponse(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return NAVER;
    }

    @Override
    public String getOAuth2ProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return Optional.ofNullable(attributes.get("email"))
                .map(Object::toString)
                .orElse(null);
    }

    @Override
    public Integer getBirthyear() {
        Object birthyear = attributes.get("birthyear");
        Object birthday = attributes.get("birthday");

        if (birthyear == null || birthday == null) {
            return null;
        }

        return Integer.parseInt(birthyear.toString());
    }

    @Override
    public Integer getBirthmonth() {
        Object birthyear = attributes.get("birthyear");
        Object birthday = attributes.get("birthday");

        if (birthyear == null || birthday == null) {
            return null;
        }

        return Integer.parseInt(birthday.toString().split("-")[0]);
    }

    @Override
    public Integer getBirthday() {
        Object birthyear = attributes.get("birthyear");
        Object birthday = attributes.get("birthday");

        if (birthyear == null || birthday == null) {
            return null;
        }

        return Integer.parseInt(birthday.toString().split("-")[1]);
    }

    @Override
    public Gender getGender() {
        return Optional.ofNullable(attributes.get("gender"))
                .map(Object::toString)
                .map(gender -> switch (gender) {
                    case "M" -> MALE;
                    case "F" -> FEMALE;
                    default -> OTHER;
                })
                .orElse(OTHER);
    }

    private boolean isValidBirthDate() {
        Object birthyear = attributes.get("birthyear");
        Object birthday = attributes.get("birthday");

        return birthyear != null && birthday != null;
    }
}
