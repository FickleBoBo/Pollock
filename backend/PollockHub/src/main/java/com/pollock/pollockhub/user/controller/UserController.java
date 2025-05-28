package com.pollock.pollockhub.user.controller;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.request.UserSignupRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserSimpleInfoResponseDTO;
import com.pollock.pollockhub.user.oauth2.annotation.Auth;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pollock/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody UserSignupRequestDTO requestDTO, HttpSession session) {
        userService.signup(requestDTO, session);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponseDTO> getUserInfo(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserInfoResponseDTO> updateUserProfile(@Auth CustomOAuth2User user, @RequestBody UpdateUserProfileRequestDTO requestDTO) {
        return ResponseEntity.ok(userService.updateUserProfile(user, requestDTO));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserSimpleInfoResponseDTO>> searchUsers(@RequestParam String keyword, @PageableDefault(sort = "nickname") Pageable pageable) {
        return ResponseEntity.ok(userService.searchUsers(keyword, pageable));
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isNicknameExists(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.isNicknameExists(nickname));
    }

    @PostMapping("/follow/{followeeNickname}")
    public ResponseEntity<Void> follow(@Auth CustomOAuth2User user, @PathVariable String followeeNickname) {
        userService.follow(user, followeeNickname);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/follow/{followeeNickname}")
    public ResponseEntity<Void> unfollow(@Auth CustomOAuth2User user, @PathVariable String followeeNickname) {
        userService.unfollow(user, followeeNickname);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/following")
    public ResponseEntity<Page<UserSimpleInfoResponseDTO>> getFollowing(@Auth CustomOAuth2User user, @PageableDefault(sort = "nickname") Pageable pageable) {
        return ResponseEntity.ok(userService.getFollowing(user, pageable));
    }

    @GetMapping("/followers")
    public ResponseEntity<Page<UserSimpleInfoResponseDTO>> getFollowers(@Auth CustomOAuth2User user, @PageableDefault(sort = "nickname") Pageable pageable) {
        return ResponseEntity.ok(userService.getFollowers(user, pageable));
    }
}
