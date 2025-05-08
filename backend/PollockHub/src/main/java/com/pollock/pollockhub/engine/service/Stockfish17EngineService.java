package com.pollock.pollockhub.engine.service;

import com.pollock.pollockhub.common.BadGatewayException;
import com.pollock.pollockhub.engine.dto.request.EngineAnalysisRequestDTO;
import com.pollock.pollockhub.engine.dto.response.RedisStreamKeyResponseDTO;
import com.pollock.pollockhub.engine.router.EngineType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

import static com.pollock.pollockhub.engine.router.EngineType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class Stockfish17EngineService implements EngineService {

    private final RestTemplate restTemplate;

    @Value("${custom.stockfish-17-proxy-server-uri}")
    private String stockfish17ProxyServerUri;

    @Override
    public EngineType getEngineType() {
        return STOCKFISH_17;
    }

    @Override
    public RedisStreamKeyResponseDTO startEngineAnalysis(EngineAnalysisRequestDTO requestDTO) {
        String streamKey = UUID.randomUUID().toString();
        String url = stockfish17ProxyServerUri + "?streamKey=" + streamKey;

        try {
            ResponseEntity<Void> responseEntity = restTemplate.postForEntity(url, requestDTO, Void.class);

            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                log.warn("Stockfish17 응답 비정상: statusCode={}, url={}", responseEntity.getStatusCode(), url);
            }

            return RedisStreamKeyResponseDTO.builder()
                    .streamKey(streamKey)
                    .build();
        } catch (RestClientException e) {
            log.error("Stockfish17 분석 요청 실패: url={}, reason={}", url, e.getMessage(), e);
            throw BadGatewayException.getInstance();
        }
    }
}
