package com.pollock.pollockhub.engine.controller;

import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.dto.response.EngineAnalysisResponseDTO;
import com.pollock.pollockhub.engine.router.EngineServiceRouter;
import com.pollock.pollockhub.engine.service.EngineService;
import com.pollock.pollockhub.engine.service.RedisStreamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pollock/engine")
@RequiredArgsConstructor
public class EngineController {

    private final EngineServiceRouter engineServiceRouter;
    private final RedisStreamService redisStreamService;

    @PostMapping
    ResponseEntity<EngineAnalysisResponseDTO> startEngineAnalysis(@RequestBody EngineAnalysisRequestDTO requestDTO) {
        EngineService engineService = engineServiceRouter.resolve(requestDTO.getEngineType());
        return ResponseEntity.ok(engineService.startEngineAnalysis(requestDTO));
    }

    @GetMapping
    ResponseEntity<String> getEngineAnalysis(@RequestParam String streamKey,
                                             @RequestParam(defaultValue = "0-0") String lastId) {
        return ResponseEntity.ok(redisStreamService.getEngineAnalysis(streamKey, lastId));
    }
}
