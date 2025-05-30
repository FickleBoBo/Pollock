package com.pollock.pollockhub.user.oauth2.dto;

import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static com.pollock.pollockhub.user.entity.Role.GUEST;

@Builder
@Getter
@ToString
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private final Long id;
    private final String nickname;
    private final Role role;

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
        return id != null ? id.toString() : "unregistered";
    }

    public boolean isRegistered() {
        return role != GUEST;
    }

    public static CustomOAuth2User preSignup() {
        return CustomOAuth2User.builder()
                .id(null)
                .nickname(null)
                .role(GUEST)
                .build();
    }

    public static CustomOAuth2User from(UserEntity userEntity) {
        return CustomOAuth2User.builder()
                .id(userEntity.getId())
                .nickname(userEntity.getNickname())
                .role(userEntity.getRole())
                .build();
    }
}
