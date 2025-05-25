package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserInfoResponseDTO getUserInfo(CustomOAuth2User user) {
        return UserInfoResponseDTO.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .bulletElo(user.getBulletElo())
                .blitzElo(user.getBlitzElo())
                .classicalElo(user.getClassicalElo())
                .puzzleElo(user.getPuzzleElo())
                .birthyear(user.getBirthyear())
                .gender(user.getGender())
                .grade(user.getGrade())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
