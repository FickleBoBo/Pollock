package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private final Long id;
    private final String oauthId;
    private final String email;
    private final String nickname;
    private final String profileImageUrl;
    private final Integer bulletElo;
    private final Integer blitzElo;
    private final Integer classicalElo;
    private final Integer puzzleElo;
    private final Integer birthyear;
    private final Gender gender;
    private final Role role;
    private final Title title;
    private final LocalDateTime createdAt;

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getName() {
        return id.toString();
    }

    public static CustomOAuth2User from(UserEntity userEntity) {
        return CustomOAuth2User.builder()
                .id(userEntity.getId())
                .oauthId(userEntity.getOauthId())
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .birthyear(userEntity.getBirthyear())
                .gender(userEntity.getGender())
                .role(userEntity.getRole())
                .title(userEntity.getTitle())
                .createdAt(userEntity.getCreatedAt())
                .build();
    }
}
