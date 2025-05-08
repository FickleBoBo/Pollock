package com.pollock.stockfishproxy.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pollock.stockfishproxy.router.StockfishType;
import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    @JsonProperty("engineType")
    private StockfishType stockfishType;

    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
