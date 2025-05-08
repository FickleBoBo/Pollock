package com.pollock.stockfishproxy.dto.request;

import com.pollock.stockfishproxy.router.EngineType;
import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    private EngineType engineType;
    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
