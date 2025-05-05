package com.pollock.user.service;

import com.pollock.user.exception.UnAuthenticatedException;
import com.pollock.user.dto.response.UserInfoResponseDTO;
import com.pollock.user.entity.UserEntity;
import com.pollock.user.oauth2.dto.CustomOAuth2User;
import com.pollock.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserInfoResponseDTO getUserInfo(CustomOAuth2User user) {
        if (user == null) {
            throw UnAuthenticatedException.getInstance();
        }

        UserEntity userEntity = userRepository.findById(user.getId()).orElseThrow(UnAuthenticatedException::getInstance);

        return UserInfoResponseDTO.builder()
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .elo(userEntity.getElo())
                .birthyear(userEntity.getBirthyear())
                .gender(userEntity.getGender())
                .grade(userEntity.getGrade())
                .build();
    }
}
