package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserSimpleInfoResponseDTO;
import com.pollock.pollockhub.user.entity.FollowEntity;
import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.exception.DuplicateNicknameException;
import com.pollock.pollockhub.user.exception.InvalidNicknameException;
import com.pollock.pollockhub.user.exception.SelfFollowNotAllowedException;
import com.pollock.pollockhub.user.exception.UserNotFoundException;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.repository.FollowRepository;
import com.pollock.pollockhub.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

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
                .title(user.getTitle())
                .createdAt(user.getCreatedAt())
                .followingCount(user.getFollowingCount())
                .followersCount(user.getFollowersCount())
                .build();
    }

    @Transactional
    public UserInfoResponseDTO updateUserProfile(CustomOAuth2User user,
                                                 UpdateUserProfileRequestDTO requestDTO,
                                                 HttpSession session) {
        String newNickname = requestDTO.getNickname();
        if (newNickname.isBlank()) {
            throw InvalidNicknameException.getInstance();
        }
        if (!newNickname.equals(user.getNickname()) && checkNicknameDuplicate(newNickname)) {
            throw DuplicateNicknameException.getInstance();
        }

        UserEntity userEntity = getUserEntity(user.getId());

        userEntity.updateProfile(
                requestDTO.getEmail(),
                requestDTO.getNickname(),
                requestDTO.getProfileImageUrl(),
                requestDTO.getBirthyear(),
                requestDTO.getGender()
        );

        CustomOAuth2User updatedUser = CustomOAuth2User.from(userEntity);

        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(updatedUser, null, updatedUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        return getUserInfo(updatedUser);
    }

    public Boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public List<UserSimpleInfoResponseDTO> searchUsers(String keyword) {
        return userRepository.findByNicknameContainingOrderByNicknameAsc(keyword).stream()
                .map(UserSimpleInfoResponseDTO::from)
                .toList();
    }

    public void follow(CustomOAuth2User user, String followeeNickname) {
        UserEntity follower = getUserEntity(user.getId());
        UserEntity followee = getUserEntity(followeeNickname);

        if (follower.getId().equals(followee.getId())) {
            throw SelfFollowNotAllowedException.getInstance();
        }
        if (followRepository.existsByFollowerAndFollowee(follower, followee)) return;

        FollowEntity followEntity = FollowEntity.builder()
                .follower(follower)
                .followee(followee)
                .build();
        followRepository.save(followEntity);
    }

    public void unfollow(CustomOAuth2User user, String followeeNickname) {
        UserEntity follower = getUserEntity(user.getId());
        UserEntity followee = getUserEntity(followeeNickname);

        followRepository.deleteByFollowerAndFollowee(follower, followee);
    }

    public List<UserSimpleInfoResponseDTO> getFollowing(CustomOAuth2User user) {
        UserEntity userEntity = getUserEntity(user.getId());
        return followRepository.findAllByFollower(userEntity).stream()
                .map(FollowEntity::getFollowee)
                .map(UserSimpleInfoResponseDTO::from)
                .toList();
    }

    public List<UserSimpleInfoResponseDTO> getFollowers(CustomOAuth2User user) {
        UserEntity userEntity = getUserEntity(user.getId());
        return followRepository.findAllByFollowee(userEntity).stream()
                .map(FollowEntity::getFollower)
                .map(UserSimpleInfoResponseDTO::from)
                .toList();
    }

    private UserEntity getUserEntity(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::getInstance);
    }

    private UserEntity getUserEntity(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::getInstance);
    }
}
