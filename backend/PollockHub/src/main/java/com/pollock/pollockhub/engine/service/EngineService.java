package com.pollock.pollockhub.engine.service;

import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.dto.response.RedisStreamKeyResponseDTO;
import com.pollock.pollockhub.engine.router.EngineType;
import org.springframework.stereotype.Service;

@Service
public interface EngineService {

    EngineType getEngineType();

    RedisStreamKeyResponseDTO startEngineAnalysis(EngineAnalysisRequestDTO requestDTO);
}
