package com.pollock.stockfishproxy.controller;

import com.pollock.stockfishproxy.service.StockfishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock/stockfish")
@RequiredArgsConstructor
public class StockfishController {

    private final StockfishService stockfishService;

    @GetMapping
    public ResponseEntity<String> getEngineAnalyze(
            @RequestParam String fen,
            @RequestParam(defaultValue = "1") String multiPV,
            @RequestParam(defaultValue = "1000") String moveTime) {
        return ResponseEntity.ok(stockfishService.getEngineAnalyze(fen, multiPV, moveTime));
    }
}
