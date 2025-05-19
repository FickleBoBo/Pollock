package com.pollock.pollockhub.game.repository;

import com.pollock.pollockhub.game.entity.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<GameEntity, Long> {
}
