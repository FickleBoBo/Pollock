package com.pollock.pollockhub.user.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 팔로우 테이블 복합키
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowId implements Serializable {

    private Long follower;
    private Long followee;
}
