package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByOauthId(String oauthId);

    boolean existsByNickname(String nickname);
}
