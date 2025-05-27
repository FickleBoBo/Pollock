package com.pollock.pollockhub.user.repository;

import com.pollock.pollockhub.user.entity.FollowEntity;
import com.pollock.pollockhub.user.entity.FollowId;
import com.pollock.pollockhub.user.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<FollowEntity, FollowId> {

    boolean existsByFollowerAndFollowee(UserEntity follower, UserEntity followee);

    void deleteByFollowerAndFollowee(UserEntity follower, UserEntity followee);

    Page<FollowEntity> findAllByFollower(UserEntity follower, Pageable pageable);

    Page<FollowEntity> findAllByFollowee(UserEntity followee, Pageable pageable);
}
