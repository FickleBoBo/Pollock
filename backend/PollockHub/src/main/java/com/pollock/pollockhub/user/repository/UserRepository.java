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

    @Query("""
                SELECT u FROM UserEntity u
                WHERE u.oAuth2Provider = :oauth2_provider AND u.oAuth2ProviderId = :oauth2_provider_id
            """)
    Optional<UserEntity> findByOAuth2ProviderAndOAuth2ProviderId(
            @Param("oauth2_provider") OAuth2Provider oAuth2Provider,
            @Param("oauth2_provider_id") String oAuth2ProviderId
    );

    Optional<UserEntity> findByNickname(String nickname);

    Page<UserEntity> findByNicknameStartingWithIgnoreCase(String keyword, Pageable pageable);

    boolean existsByNickname(String nickname);
}
