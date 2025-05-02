package com.pollock.user.oauth2.dto;

import com.pollock.user.entity.Gender;
import com.pollock.user.entity.Grade;
import com.pollock.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final UserEntity userEntity;

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + userEntity.getGrade().name()));
    }

    @Override
    public String getName() {
        return userEntity.getId().toString();
    }

    public Long getId() {
        return userEntity.getId();
    }

    public String getEmail() {
        return userEntity.getEmail();
    }

    public String getNickname() {
        return userEntity.getNickname();
    }

    public String getProfileImageUrl() {
        return userEntity.getProfileImageUrl();
    }

    public Integer getBirthyear() {
        return userEntity.getBirthyear();
    }

    public Gender getGender() {
        return userEntity.getGender();
    }

    public Grade getGrade() {
        return userEntity.getGrade();
    }
}
