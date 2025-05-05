package com.pollock.stockfishproxy.controller;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.service.StockfishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/pollock/stockfish")
@RequiredArgsConstructor
public class StockfishController {

    private final StockfishService stockfishService;

    @PostMapping
    public ResponseEntity<Void> publishEngineAnalysis(@RequestBody EngineAnalysisRequestDTO requestDTO) {
        log.info("StockfishController.publishEngineAnalysis 요청 수신");
        stockfishService.publishEngineAnalysis(requestDTO);
        log.info("StockfishController.publishEngineAnalysis 응답 완료");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> cancelEngineAnalysis(@PathVariable Long gameId) {
        log.info("StockfishController.cancelEngineAnalysis 요청 수신: gameId = {}", gameId);
        stockfishService.cancelEngineAnalysis(gameId);
        log.info("StockfishController.cancelEngineAnalysis 응답 완료: gameId = {}", gameId);
        return ResponseEntity.ok().build();
    }
}
