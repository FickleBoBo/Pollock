package com.pollock.stockfishproxy.dto.request;

import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    private Long gameId;
    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
