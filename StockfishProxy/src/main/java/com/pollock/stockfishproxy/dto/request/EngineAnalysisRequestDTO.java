package com.pollock.stockfishproxy.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class EngineAnalysisRequestDTO {

    private String channelKey;
    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
