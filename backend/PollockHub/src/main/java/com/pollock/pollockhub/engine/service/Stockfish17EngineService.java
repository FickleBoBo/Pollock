package com.pollock.pollockhub.engine.service;

import com.pollock.pollockhub.common.exception.BadGatewayException;
import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.router.EngineType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import static com.pollock.pollockhub.engine.router.EngineType.STOCKFISH_17;

@Slf4j
@Service
@RequiredArgsConstructor
public class Stockfish17EngineService implements EngineService {

    private final RestTemplate restTemplate;

    @Value("${custom.stockfish-17-1-proxy-server-uri}")
    private String stockfish17ProxyServerUri;

    @Override
    public EngineType getEngineType() {
        return STOCKFISH_17;
    }

    @Override
    public void getEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        try {
            ResponseEntity<Void> responseEntity = restTemplate.postForEntity(stockfish17ProxyServerUri, requestDTO, Void.class);

            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                log.warn("❗️Stockfish17 비정상 응답: {}", responseEntity.getStatusCode());
            }
        } catch (RestClientException e) {
            log.error("❌ Stockfish17 분석 요청 실패: {}", e.getMessage(), e);
            throw BadGatewayException.getInstance();
        }
    }
}
