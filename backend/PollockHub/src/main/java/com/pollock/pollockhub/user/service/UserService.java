package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.request.UserSignupRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserSimpleInfoResponseDTO;
import com.pollock.pollockhub.user.entity.FollowEntity;
import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.exception.*;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.repository.FollowRepository;
import com.pollock.pollockhub.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.pollock.pollockhub.constant.Constant.MAX_NICKNAME_LENGTH;
import static com.pollock.pollockhub.constant.Constant.MIN_NICKNAME_LENGTH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    @Value("${custom.user.default-profile-image-url}")
    private String defaultProfileImageUrl;

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Transactional
    public void signup(UserSignupRequestDTO requestDTO, HttpSession session) {
        validateNickname(requestDTO.getNickname());

        UserEntity savedUser = userRepository.save(UserEntity.builder()
                .oauthId(session.getAttribute("oauthId").toString())
                .email(session.getAttribute("email") == null ? null : session.getAttribute("email").toString())
                .nickname(requestDTO.getNickname())
                .profileImageUrl(defaultProfileImageUrl)
                .birthyear(session.getAttribute("birthyear") == null ? null : (Integer) session.getAttribute("birthyear"))
                .gender((Gender) session.getAttribute("gender"))
                .build());

        CustomOAuth2User customOAuth2User = CustomOAuth2User.from(savedUser);

        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }

    public UserInfoResponseDTO getUserInfo(CustomOAuth2User user) {
        UserEntity userEntity = getUserEntity(user.getId());

        return UserInfoResponseDTO.from(
                userEntity,
                followRepository.countByFollower(userEntity),
                followRepository.countByFollowee(userEntity)
        );
    }

    @Transactional
    public UserInfoResponseDTO updateUserProfile(CustomOAuth2User user,
                                                 UpdateUserProfileRequestDTO requestDTO) {
        validateNickname(requestDTO.getNickname(), user.getNickname());

        UserEntity userEntity = getUserEntity(user.getId());

        userEntity.updateProfile(
                requestDTO.getEmail(),
                requestDTO.getNickname(),
                requestDTO.getProfileImageUrl(),
                requestDTO.getBirthyear(),
                requestDTO.getGender()
        );

        return UserInfoResponseDTO.from(
                userEntity,
                followRepository.countByFollower(userEntity),
                followRepository.countByFollowee(userEntity)
        );
    }

    public Page<UserSimpleInfoResponseDTO> searchUsers(String keyword, Pageable pageable) {
        return userRepository.findByNicknameStartingWith(keyword, pageable)
                .map(user -> UserSimpleInfoResponseDTO.from(
                        user,
                        followRepository.countByFollower(user),
                        followRepository.countByFollowee(user)
                ));
    }

    public boolean isNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public void follow(CustomOAuth2User user, String followeeNickname) {
        UserEntity follower = getUserEntity(user.getId());
        UserEntity followee = getUserEntity(followeeNickname);

        if (follower.getId().equals(followee.getId())) {
            throw SelfFollowNotAllowedException.getInstance();
        }

        if (followRepository.existsByFollowerAndFollowee(follower, followee)) return;

        followRepository.save(FollowEntity.builder()
                .follower(follower)
                .followee(followee)
                .build());
    }

    public void unfollow(CustomOAuth2User user, String followeeNickname) {
        followRepository.deleteByFollowerAndFollowee(getUserEntity(user.getId()), getUserEntity(followeeNickname));
    }

    public Page<UserSimpleInfoResponseDTO> getFollowing(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollower(getUserEntity(user.getId()), pageable)
                .map(follow -> {
                    UserEntity followee = follow.getFollowee();
                    long followingCount = followRepository.countByFollower(followee);
                    long followersCount = followRepository.countByFollowee(followee);
                    return UserSimpleInfoResponseDTO.from(followee, followingCount, followersCount);
                });
    }

    public Page<UserSimpleInfoResponseDTO> getFollowers(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollowee(getUserEntity(user.getId()), pageable)
                .map(follow -> {
                    UserEntity follower = follow.getFollower();
                    long followingCount = followRepository.countByFollower(follower);
                    long followersCount = followRepository.countByFollowee(follower);
                    return UserSimpleInfoResponseDTO.from(follower, followingCount, followersCount);
                });
    }

    private UserEntity getUserEntity(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::getInstance);
    }

    private UserEntity getUserEntity(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::getInstance);
    }

    private void validateNickname(String nickname) {
        if (nickname == null || nickname.isBlank() || (nickname.length() < MIN_NICKNAME_LENGTH || nickname.length() > MAX_NICKNAME_LENGTH)) {
            throw InvalidNicknameException.getInstance();
        }

        if (isNicknameExists(nickname)) {
            throw DuplicateNicknameException.getInstance();
        }
    }

    private void validateNickname(String nickname, String currentNickname) {
        if (nickname == null || nickname.isBlank() || (nickname.length() < MIN_NICKNAME_LENGTH || nickname.length() > MAX_NICKNAME_LENGTH)) {
            throw InvalidNicknameException.getInstance();
        }

        if (!nickname.equals(currentNickname) && isNicknameExists(nickname)) {
            throw DuplicateNicknameException.getInstance();
        }
    }
}
