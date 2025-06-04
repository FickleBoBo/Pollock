package com.pollock.pollockhub.game.repository;

import com.pollock.pollockhub.game.entity.GameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GameRepository extends JpaRepository<GameEntity, Long> {

    @Query("""
                SELECT g FROM GameEntity g
                WHERE g.whiteUser.id = :user_id OR g.blackUser.id = :user_id
            """)
    Page<GameEntity> findAllByUserId(@Param("user_id") Long userId, Pageable pageable);

    @Query("""
                SELECT g FROM GameEntity g
                WHERE g.whiteUser.nickname = :nickname OR g.blackUser.nickname = :nickname
            """)
    Page<GameEntity> findAllByNickname(@Param("nickname") String nickname, Pageable pageable);
}
