package com.pollock.pollockhub.game.controller;

import com.pollock.pollockhub.game.enums.GameType;
import com.pollock.pollockhub.game.service.GameService;
import com.pollock.pollockhub.user.oauth2.annotation.Auth;
import com.pollock.pollockhub.user.oauth2.dto.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/{gameType}")
    public ResponseEntity<Void> requestMatch(@Auth CustomOAuth2User user,
                                             @PathVariable GameType gameType) {
        gameService.enqueueUser(user, gameType);
        return ResponseEntity.accepted().build();
    }
}
