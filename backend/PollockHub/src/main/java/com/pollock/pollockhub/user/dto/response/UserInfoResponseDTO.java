package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.user.entity.Gender;
import com.pollock.pollockhub.user.entity.Role;
import com.pollock.pollockhub.user.entity.Title;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 개인정보를 포함한 유저 정보 DTO
 */
@Builder
@Getter
public class UserInfoResponseDTO {

    private String email;
    private String nickname;
    private String profileImageUrl;
    private Integer bulletElo;
    private Integer blitzElo;
    private Integer classicalElo;
    private Integer puzzleElo;
    private Integer birthyear;
    private Gender gender;
    private Role role;
    private Title title;
    private LocalDateTime createdAt;
    private Integer followingCount;
    private Integer followersCount;
}
