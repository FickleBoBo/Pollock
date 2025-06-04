package com.pollock.pollockhub.user.controller;

import com.pollock.pollockhub.user.dto.request.UpdateUserProfileRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserPrivateInfoResponseDTO;
import com.pollock.pollockhub.user.dto.response.UserPublicInfoResponseDTO;
import com.pollock.pollockhub.user.oauth2.annotation.Auth;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import com.pollock.pollockhub.user.service.UserService;
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

    @GetMapping("/me")
    public ResponseEntity<UserPrivateInfoResponseDTO> getMyInfo(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getMyInfo(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserPrivateInfoResponseDTO> updateMyProfile(@Auth CustomOAuth2User user,
                                                                      @RequestBody UpdateUserProfileRequestDTO requestDTO) {
        return ResponseEntity.ok(userService.updateMyProfile(user, requestDTO));
    }

    @PostMapping("/{nickname}/follow")
    public ResponseEntity<Void> follow(@Auth CustomOAuth2User user,
                                       @PathVariable String nickname) {
        userService.follow(user, nickname);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{nickname}/unfollow")
    public ResponseEntity<Void> unfollow(@Auth CustomOAuth2User user,
                                         @PathVariable String nickname) {
        userService.unfollow(user, nickname);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/following")
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getMyFollowing(@Auth CustomOAuth2User user,
                                                                          @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(userService.getMyFollowing(user, pageable));
    }

    @GetMapping("/me/followers")
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getMyFollowers(@Auth CustomOAuth2User user,
                                                                          @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(userService.getMyFollowers(user, pageable));
    }
}
