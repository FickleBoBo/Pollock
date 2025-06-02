package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.UserEntity;
import com.pollock.pollockhub.user.oauth2.enums.OAuth2Provider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u FROM UserEntity u WHERE u.oAuth2Provider = :oAuth2Provider AND u.oAuth2ProviderId = :oAuth2ProviderId")
    Optional<UserEntity> findByOAuth2ProviderAndOAuth2ProviderId(@Param("oAuth2Provider") OAuth2Provider oAuth2Provider, @Param("oAuth2ProviderId") String oAuth2ProviderId);

    Optional<UserEntity> findByNickname(String nickname);

    Page<UserEntity> findByNicknameStartingWithIgnoreCase(String keyword, Pageable pageable);

    boolean existsByNickname(String nickname);
}
