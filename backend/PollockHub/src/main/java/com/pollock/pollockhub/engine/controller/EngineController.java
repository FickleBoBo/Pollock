package com.pollock.pollockhub.engine.controller;

import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.router.EngineServiceRouter;
import com.pollock.pollockhub.engine.service.EngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pollock/engine")
@RequiredArgsConstructor
public class EngineController {

    private final EngineServiceRouter engineServiceRouter;

    @PostMapping("/analysis")
    public ResponseEntity<Void> publishEngineAnalysis(@RequestBody EngineAnalysisRequestDTO requestDTO) {
        EngineService engineService = engineServiceRouter.resolve(requestDTO.getEngineType());
        engineService.publishEngineAnalysis(requestDTO);
        return ResponseEntity.accepted().build();
    }
}
