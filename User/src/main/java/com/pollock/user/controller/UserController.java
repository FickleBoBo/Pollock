package com.pollock.user.controller;

import com.pollock.user.dto.response.UserInfoResponseDTO;
import com.pollock.user.oauth2.annotation.Auth;
import com.pollock.user.oauth2.dto.CustomOAuth2User;
import com.pollock.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponseDTO> getUserInfo(@Auth CustomOAuth2User user) {
        return ResponseEntity.ok(userService.getUserInfo(user));
    }
}
