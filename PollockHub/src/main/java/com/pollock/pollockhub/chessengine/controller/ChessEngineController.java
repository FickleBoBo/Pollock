package com.pollock.pollockhub.chessengine.controller;

import com.pollock.pollockhub.chessengine.dto.response.EngineAnalysisResponseDTO;
import com.pollock.pollockhub.chessengine.service.ChessEngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock")
@CrossOrigin
@RequiredArgsConstructor
public class ChessEngineController {

    private final ChessEngineService chessEngineService;

    @GetMapping
    public ResponseEntity<EngineAnalysisResponseDTO> getEngineAnalysis() {
        return ResponseEntity.ok(chessEngineService.getEngineAnalysis());
    }
}
