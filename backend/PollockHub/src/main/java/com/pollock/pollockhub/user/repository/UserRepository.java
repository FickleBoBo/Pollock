package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByOauthId(String oauthId);

    Optional<UserEntity> findByNickname(String nickname);

    boolean existsByNickname(String nickname);

    Page<UserEntity> findByNicknameStartingWith(String keyword, Pageable pageable);
}
