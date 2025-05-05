package com.pollock.user.oauth2.service;

import com.pollock.user.entity.UserEntity;
import com.pollock.user.oauth2.dto.CustomOAuth2User;
import com.pollock.user.oauth2.dto.NaverResponse;
import com.pollock.user.oauth2.dto.OAuth2Response;
import com.pollock.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2Response oAuth2Response = new NaverResponse(oAuth2User.getAttributes());

        Optional<UserEntity> existUser = userRepository.findByEmail(oAuth2Response.getEmail());

        if (existUser.isEmpty()) {
            UserEntity userEntity = UserEntity.builder()
                    .email(oAuth2Response.getEmail())
                    .nickname(oAuth2Response.getNickname())
                    .profileImageUrl(oAuth2Response.getProfileImageUrl())
                    .birthyear(oAuth2Response.getBirthyear())
                    .gender(oAuth2Response.getGender())
                    .build();
            userRepository.save(userEntity);

            return CustomOAuth2User.builder()
                    .Id(userEntity.getId())
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .profileImageUrl(userEntity.getProfileImageUrl())
                    .elo(userEntity.getElo())
                    .birthyear(userEntity.getBirthyear())
                    .gender(userEntity.getGender())
                    .grade(userEntity.getGrade())
                    .build();
        } else {
            return CustomOAuth2User.builder()
                    .Id(existUser.get().getId())
                    .email(existUser.get().getEmail())
                    .nickname(existUser.get().getNickname())
                    .profileImageUrl(existUser.get().getProfileImageUrl())
                    .elo(existUser.get().getElo())
                    .birthyear(existUser.get().getBirthyear())
                    .gender(existUser.get().getGender())
                    .grade(existUser.get().getGrade())
                    .build();
        }
    }
}
