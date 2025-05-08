package com.pollock.stockfishproxy.dto.request;

import com.pollock.stockfishproxy.router.StockfishEngineType;
import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    private StockfishEngineType stockfishEngineType;
    private String fen;
    private Integer multiPV;
    private Long moveTime;
}
