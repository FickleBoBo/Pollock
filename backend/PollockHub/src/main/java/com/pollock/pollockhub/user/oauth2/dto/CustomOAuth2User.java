package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Grade;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private final Long id;
    private final String email;
    private final String nickname;
    private final String profileImageUrl;
    private final Integer bulletElo;
    private final Integer blitzElo;
    private final Integer classicalElo;
    private final Integer puzzleElo;
    private final Integer birthyear;
    private final Gender gender;
    private final Grade grade;

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(grade.name()));
    }

    @Override
    public String getName() {
        return id.toString();
    }
}
