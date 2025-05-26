package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.FollowEntity;
import com.pollock.pollockhub.user.entity.FollowId;
import com.pollock.pollockhub.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<FollowEntity, FollowId> {

    boolean existsByFollowerAndFollowee(UserEntity follower, UserEntity followee);

    void deleteByFollowerAndFollowee(UserEntity follower, UserEntity followee);

    List<FollowEntity> findAllByFollower(UserEntity follower);

    List<FollowEntity> findAllByFollowee(UserEntity followee);
}
