package com.pollock.pollockhub.game.controller;

import com.pollock.pollockhub.game.dto.response.GameInfoResponseDTO;
import com.pollock.pollockhub.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock/public/games")
@RequiredArgsConstructor
public class GamePublicController {

    private final GameService gameService;

    @GetMapping
    ResponseEntity<Page<GameInfoResponseDTO>> getGames(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(gameService.getGames(pageable));
    }

    @GetMapping("/{gameId}")
    ResponseEntity<GameInfoResponseDTO> getGame(@PathVariable Long gameId) {
        return ResponseEntity.ok(gameService.getGame(gameId));
    }
}
