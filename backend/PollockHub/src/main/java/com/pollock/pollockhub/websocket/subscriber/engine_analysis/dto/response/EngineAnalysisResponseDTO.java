package com.pollock.pollockhub.websocket.subscriber.engine_analysis.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class EngineAnalysisResponseDTO {

    private Integer score;
    private Integer mate;
    private Integer currentPv;
    private List<String> pvList;
}
