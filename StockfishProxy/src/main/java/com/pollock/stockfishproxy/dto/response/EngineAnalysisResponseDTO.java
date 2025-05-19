package com.pollock.stockfishproxy.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class EngineAnalysisResponseDTO {

    private Integer score;
    private Integer mate;
    private Integer currentPv;
    private List<String> pvList;
}
