package com.pollock.stockfishproxy.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pollock.stockfishproxy.router.StockfishEngineType;
import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    @JsonProperty("engineType")
    private StockfishEngineType stockfishEngineType;

    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
