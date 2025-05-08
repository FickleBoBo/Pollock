package com.pollock.stockfishproxy.controller;

import com.pollock.stockfishproxy.dto.request.EngineAnalysisRequestDTO;
import com.pollock.stockfishproxy.service.StockfishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/pollock/engine/stockfish17")
@RequiredArgsConstructor
public class StockfishController {

    private final StockfishService stockfishService;

    @PostMapping
    public ResponseEntity<Void> publishEngineAnalysis(@RequestParam String streamKey, @RequestBody EngineAnalysisRequestDTO requestDTO) {
        log.info("StockfishController.publishEngineAnalysis 요청 수신");
        stockfishService.publishEngineAnalysis(streamKey, requestDTO);
        log.info("StockfishController.publishEngineAnalysis 응답 완료");
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{streamKey}")
    public ResponseEntity<Void> cancelEngineAnalysis(@PathVariable String streamKey) {
        log.info("StockfishController.cancelEngineAnalysis 요청 수신: streamKey = {}", streamKey);
        stockfishService.cancelEngineAnalysis(streamKey);
        log.info("StockfishController.cancelEngineAnalysis 응답 완료: streamKey = {}", streamKey);
        return ResponseEntity.ok().build();
    }
}
