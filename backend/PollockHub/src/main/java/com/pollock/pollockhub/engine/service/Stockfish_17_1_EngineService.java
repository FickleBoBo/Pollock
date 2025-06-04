package com.pollock.pollockhub.engine.service;

import com.pollock.pollockhub.common.exception.BadGatewayException;
import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.router.EngineType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import static com.pollock.pollockhub.engine.router.EngineType.STOCKFISH_17_1;

@Service
@RequiredArgsConstructor
public class Stockfish_17_1_EngineService implements EngineService {

    private final RestTemplate restTemplate;

    @Value("${custom.stockfish-17-1-proxy-server-uri}")
    private String stockfish_17_1_ProxyServerUri;

    @Override
    public EngineType getEngineType() {
        return STOCKFISH_17_1;
    }

    @Override
    public void publishEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        try {
            restTemplate.postForEntity(stockfish_17_1_ProxyServerUri + "/publish", requestDTO, Void.class);
        } catch (RestClientException e) {
            throw BadGatewayException.getInstance();
        }
    }
}
