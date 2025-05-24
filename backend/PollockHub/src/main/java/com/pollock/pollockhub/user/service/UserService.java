package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.exception.UserNotFoundException;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserInfoResponseDTO getUserInfo(CustomOAuth2User user) {
        UserEntity userEntity = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::getInstance);

        return UserInfoResponseDTO.builder()
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .profileImageUrl(userEntity.getProfileImageUrl())
                .bulletElo(userEntity.getBulletElo())
                .blitzElo(userEntity.getBlitzElo())
                .classicalElo(userEntity.getClassicalElo())
                .puzzleElo(userEntity.getPuzzleElo())
                .birthyear(userEntity.getBirthyear())
                .gender(userEntity.getGender())
                .grade(userEntity.getGrade())
                .build();
    }
}
