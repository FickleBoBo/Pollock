package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.user.dto.request.UpdateUserInfoRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.exception.DuplicateNicknameException;
import com.pollock.pollockhub.user.exception.UserNotFoundException;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Transactional
    public UserInfoResponseDTO updateUserInfo(CustomOAuth2User user,
                                              UpdateUserInfoRequestDTO requestDTO,
                                              HttpSession session) {
        if (userRepository.existsByNickname(requestDTO.getNickname())) {
            throw DuplicateNicknameException.getInstance();
        }

        UserEntity userEntity = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::getInstance);

        userEntity.update(
                requestDTO.getEmail(),
                requestDTO.getNickname(),
                requestDTO.getProfileImageUrl(),
                requestDTO.getBirthyear(),
                requestDTO.getGender(),
                requestDTO.getRole()
        );

        CustomOAuth2User updatedUser = CustomOAuth2User.from(userEntity);

        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(updatedUser, null, updatedUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        return getUserInfo(updatedUser);
    }
}
