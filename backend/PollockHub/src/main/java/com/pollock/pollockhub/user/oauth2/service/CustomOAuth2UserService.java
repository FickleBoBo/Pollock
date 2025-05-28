package com.pollock.pollockhub.user.oauth2.service;

import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.oauth2.dto.KakaoResponse;
import com.pollock.pollockhub.user.oauth2.dto.NaverResponse;
import com.pollock.pollockhub.user.oauth2.dto.OAuth2Response;
import com.pollock.pollockhub.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
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

    private final HttpSession session;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = switch (registrationId) {
            case "naver" -> new NaverResponse(oAuth2User.getAttributes());
            case "kakao" -> new KakaoResponse(oAuth2User.getAttributes());
            default -> throw new OAuth2AuthenticationException("Unsupported provider: " + registrationId);
        };

        Optional<UserEntity> existUser = userRepository.findByOauthId(oAuth2Response.getOauthId());

        if (existUser.isEmpty()) {
            session.setAttribute("oauthId", oAuth2Response.getOauthId());
            session.setAttribute("email", oAuth2Response.getEmail());
            session.setAttribute("birthyear", oAuth2Response.getBirthyear());
            session.setAttribute("gender", oAuth2Response.getGender());
            return CustomOAuth2User.preSignup();
        } else {
            return CustomOAuth2User.from(existUser.get());
        }
    }
}
