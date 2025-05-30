package com.pollock.pollockhub.user.controller;

import com.pollock.pollockhub.user.dto.request.UserSignupRequestDTO;
import com.pollock.pollockhub.user.dto.response.UserPublicInfoResponseDTO;
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
@RequestMapping("/api/pollock/public/users")
@RequiredArgsConstructor
public class UserPublicController {

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

    @GetMapping("/{nickname}/following")
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getUserFollowing(@PathVariable String nickname,
                                                                            @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(userService.getUserFollowing(nickname, pageable));
    }

    @GetMapping("/{nickname}/followers")
    public ResponseEntity<Page<UserPublicInfoResponseDTO>> getUserFollowers(@PathVariable String nickname,
                                                                            @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(userService.getUserFollowers(nickname, pageable));
    }
}
