package com.pollock.stockfishproxy.controller;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.service.StockfishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pollock/stockfish")
@CrossOrigin
@RequiredArgsConstructor
public class StockfishController {

    private final StockfishService stockfishService;

    @PostMapping
    public ResponseEntity<Void> publishEngineAnalysis(@RequestBody EngineAnalysisRequestDTO requestDTO) {
        stockfishService.publishEngineAnalysis(requestDTO);
        return ResponseEntity.ok().build();
    }
}
