package com.pollock.pollockhub.user.controller;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.request.UserSignupRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserPrivateInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserPublicInfoResponseDTO;
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

import java.net.URI;

@RestController
@RequestMapping("/api/pollock/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> signup(@RequestBody UserSignupRequestDTO requestDTO,
                                       HttpSession session) {
        userService.signup(requestDTO, session);
        return ResponseEntity.created(URI.create("/api/pollock/users/me")).build();
    }

    @GetMapping
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getUsers(@RequestParam(defaultValue = "") String keyword,
                                                                    @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(userService.getUsers(keyword, pageable));
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<UserPublicInfoResponseDTO> getUser(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.getUser(nickname));
    }

    @RequestMapping(value = "/{nickname}", method = RequestMethod.HEAD)
    public ResponseEntity<Void> checkNicknameExists(@PathVariable String nickname) {
        return userService.checkNicknameExists(nickname)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserPrivateInfoResponseDTO> getMyInfo(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getMyInfo(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserPrivateInfoResponseDTO> updateMyProfile(@Auth CustomOAuth2User user,
                                                                      @RequestBody UpdateUserProfileRequestDTO requestDTO) {
        return ResponseEntity.ok(userService.updateMyProfile(user, requestDTO));
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
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getFollowing(@Auth CustomOAuth2User user, @PageableDefault(sort = "nickname") Pageable pageable) {
        return ResponseEntity.ok(userService.getFollowing(user, pageable));
    }

    @GetMapping("/followers")
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getFollowers(@Auth CustomOAuth2User user, @PageableDefault(sort = "nickname") Pageable pageable) {
        return ResponseEntity.ok(userService.getFollowers(user, pageable));
    }
}
