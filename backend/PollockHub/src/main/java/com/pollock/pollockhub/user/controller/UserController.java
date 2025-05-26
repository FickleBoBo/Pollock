package com.pollock.pollockhub.user.controller;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserSimpleInfoResponseDTO;
import com.pollock.pollockhub.user.oauth2.annotation.Auth;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pollock/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponseDTO> getUserInfo(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserInfoResponseDTO> updateUserProfile(@Auth CustomOAuth2User user,
                                                                 @RequestBody UpdateUserProfileRequestDTO requestDTO,
                                                                 HttpSession session) {
        return ResponseEntity.ok(userService.updateUserProfile(user, requestDTO, session));
    }

    @GetMapping("/nickname/check")
    public ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkNicknameDuplicate(nickname));
    }

    @PostMapping("/follow/{followeeNickname}")
    public ResponseEntity<Void> follow(@Auth CustomOAuth2User user,
                                       @PathVariable String followeeNickname) {
        userService.follow(user, followeeNickname);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/follow/{followeeNickname}")
    public ResponseEntity<Void> unfollow(@Auth CustomOAuth2User user,
                                         @PathVariable String followeeNickname) {
        userService.unfollow(user, followeeNickname);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/following")
    public ResponseEntity<List<UserSimpleInfoResponseDTO>> getFollowing(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getFollowing(user));
    }

    @GetMapping("/followers")
    public ResponseEntity<List<UserSimpleInfoResponseDTO>> getFollowers(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getFollowers(user));
    }
}
