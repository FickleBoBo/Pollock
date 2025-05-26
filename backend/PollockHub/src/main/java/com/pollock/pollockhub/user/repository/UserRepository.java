package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByOauthId(String oauthId);

    Optional<UserEntity> findByNickname(String nickname);

    List<UserEntity> findByNicknameContainingOrderByNicknameAsc(String keyword);

    boolean existsByNickname(String nickname);
}
