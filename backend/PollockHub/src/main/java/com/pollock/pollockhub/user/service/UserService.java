package com.pollock.pollockhub.user.service;

import com.pollock.pollockhub.game.entity.GameType;
import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.request.UserSignupRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserPrivateInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserPublicInfoResponseDTO;
import com.pollock.pollockhub.user.entity.FollowEntity;
import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.exception.*;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;
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
        assertValidNickname(requestDTO.getNickname());

        UserEntity savedUser = userRepository.save(UserEntity.builder()
                .oAuth2Provider(OAuth2Provider.valueOf(getStringAttribute(session, "oAuth2Provider")))
                .oAuth2ProviderId(getStringAttribute(session, "oAuth2ProviderId"))
                .email(getStringAttribute(session, "email"))
                .birthyear(getIntegerAttribute(session, "birthyear"))
                .birthmonth(getIntegerAttribute(session, "birthmonth"))
                .birthday(getIntegerAttribute(session, "birthday"))
                .gender(Gender.valueOf(getStringAttribute(session, "gender")))
                .profileImageUrl(defaultProfileImageUrl)
                .nickname(requestDTO.getNickname())
                .build());

        CustomOAuth2User customOAuth2User = CustomOAuth2User.from(savedUser);

        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }

    public Page<UserPublicInfoResponseDTO> getUsers(String keyword, Pageable pageable) {
        return userRepository.findByNicknameStartingWithIgnoreCase(keyword, pageable)
                .map(UserPublicInfoResponseDTO::from);
    }

    public UserPublicInfoResponseDTO getUser(String nickname) {
        return UserPublicInfoResponseDTO.from(getUserEntity(nickname));
    }

    public boolean checkNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public UserPrivateInfoResponseDTO getMyInfo(CustomOAuth2User user) {
        return UserPrivateInfoResponseDTO.from(getUserEntity(user.getId()));
    }

    @Transactional
    public UserPrivateInfoResponseDTO updateMyProfile(CustomOAuth2User user,
                                                      UpdateUserProfileRequestDTO requestDTO) {
        assertValidNickname(requestDTO.getNickname());

        UserEntity userEntity = getUserEntity(user.getId());

        userEntity.updateProfile(
                requestDTO.getEmail(),
                requestDTO.getBirthyear(),
                requestDTO.getBirthmonth(),
                requestDTO.getBirthday(),
                requestDTO.getGender(),
                requestDTO.getProfileImageUrl(),
                requestDTO.getNickname()
        );

        return UserPrivateInfoResponseDTO.from(userEntity);
    }

    @Transactional
    public void follow(CustomOAuth2User user, String nickname) {
        UserEntity follower = getUserEntity(user.getId());
        UserEntity followee = getUserEntity(nickname);

        if (follower.getId().equals(followee.getId())) {
            throw SelfFollowNotAllowedException.getInstance();
        }

        if (followRepository.existsByFollowerAndFollowee(follower, followee)) {
            throw AlreadyFollowingException.getInstance();
        }

        followRepository.save(
                FollowEntity.builder()
                        .follower(follower)
                        .followee(followee)
                        .build()
        );

        follower.increaseFollowingCount();
        followee.increaseFollowersCount();
    }

    @Transactional
    public void unfollow(CustomOAuth2User user, String nickname) {
        UserEntity follower = getUserEntity(user.getId());
        UserEntity followee = getUserEntity(nickname);

        followRepository.deleteByFollowerAndFollowee(follower, followee);

        follower.decreaseFollowingCount();
        followee.decreaseFollowersCount();
    }

    public Page<UserPublicInfoResponseDTO> getMyFollowing(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollower(getUserEntity(user.getId()), pageable)
                .map(follow -> UserPublicInfoResponseDTO.from(follow.getFollowee()));
    }

    public Page<UserPublicInfoResponseDTO> getMyFollowers(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollowee(getUserEntity(user.getId()), pageable)
                .map(follow -> UserPublicInfoResponseDTO.from(follow.getFollower()));
    }

    public Page<UserPublicInfoResponseDTO> getUserFollowing(String nickname, Pageable pageable) {
        return followRepository.findAllByFollower(getUserEntity(nickname), pageable)
                .map(follow -> UserPublicInfoResponseDTO.from(follow.getFollowee()));
    }

    public Page<UserPublicInfoResponseDTO> getUserFollowers(String nickname, Pageable pageable) {
        return followRepository.findAllByFollowee(getUserEntity(nickname), pageable)
                .map(follow -> UserPublicInfoResponseDTO.from(follow.getFollower()));
    }

    private Integer getIntegerAttribute(HttpSession session, String key) {
        Object value = session.getAttribute(key);
        return value != null ? Integer.parseInt(value.toString()) : null;
    }

    private String getStringAttribute(HttpSession session, String key) {
        Object value = session.getAttribute(key);
        return value != null ? value.toString() : null;
    }

    private UserEntity getUserEntity(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::getInstance);
    }

    private UserEntity getUserEntity(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::getInstance);
    }

    private void assertValidNickname(String nickname) {
        if (nickname == null || nickname.isBlank() || nickname.length() < MIN_NICKNAME_LENGTH || nickname.length() > MAX_NICKNAME_LENGTH) {
            throw InvalidNicknameException.getInstance();
        }

        if (checkNicknameExists(nickname)) {
            throw DuplicatedNicknameException.getInstance();
        }
    }

    public int getEloByGameType(CustomOAuth2User user, GameType gameType) {
        UserEntity userEntity = getUserEntity(user.getId());

        return switch (gameType) {
            case BULLET_1_0, BULLET_1_1, BULLET_2_1 -> userEntity.getBulletElo();
            case BLITZ_3_0, BLITZ_3_2, BLITZ_5_0 -> userEntity.getBlitzElo();
            case RAPID_10_0, RAPID_10_5, RAPID_15_10 -> userEntity.getRapidElo();
            case CLASSICAL_30_0, CLASSICAL_30_20, CLASSICAL_90_30 -> userEntity.getClassicalElo();
        };
    }
}
