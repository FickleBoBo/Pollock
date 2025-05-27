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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    /**
     * 유저 정보 세션에서 찾아서 반환
     */
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

    /**
     * 유저 프로필 정보 갱신 및 세션 인증 객체 갱신
     */
    @Transactional
    public UserInfoResponseDTO updateUserProfile(CustomOAuth2User user,
                                                 UpdateUserProfileRequestDTO requestDTO,
                                                 HttpSession session) {
        String newNickname = requestDTO.getNickname();

        if (newNickname.isBlank()) {
            throw InvalidNicknameException.getInstance();
        }

        if (!newNickname.equals(user.getNickname()) && isNicknameExists(newNickname)) {
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

    /**
     * 해당 닉네임이 DB에 존재하는지 확인
     */
    public Boolean isNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /**
     * 키워드를 포함하는 닉네임의 유저들 반환
     */
    public Page<UserSimpleInfoResponseDTO> searchUsers(String keyword, Pageable pageable) {
        return userRepository.findByNicknameStartingWith(keyword, pageable)
                .map(UserSimpleInfoResponseDTO::from);
    }

    /**
     * 팔로이에 대한 팔로우
     */
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

    /**
     * 팔로이에 대한 언팔로우
     */
    public void unfollow(CustomOAuth2User user, String followeeNickname) {
        followRepository.deleteByFollowerAndFollowee(getUserEntity(user.getId()), getUserEntity(followeeNickname));
    }

    /**
     * 팔로잉한 유저들 반환
     */
    public Page<UserSimpleInfoResponseDTO> getFollowing(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollower(getUserEntity(user.getId()), pageable)
                .map(FollowEntity::getFollowee)
                .map(UserSimpleInfoResponseDTO::from);
    }

    /**
     * 나를 팔로우한 유저들 반환
     */
    public Page<UserSimpleInfoResponseDTO> getFollowers(CustomOAuth2User user, Pageable pageable) {
        return followRepository.findAllByFollowee(getUserEntity(user.getId()), pageable)
                .map(FollowEntity::getFollower)
                .map(UserSimpleInfoResponseDTO::from);
    }

    /**
     * Id로 유저 엔티티 반환 헬퍼 메서드
     */
    private UserEntity getUserEntity(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::getInstance);
    }

    /**
     * 닉네임으로 유저 엔티티 반환 헬퍼 메서드
     */
    private UserEntity getUserEntity(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::getInstance);
    }
}
