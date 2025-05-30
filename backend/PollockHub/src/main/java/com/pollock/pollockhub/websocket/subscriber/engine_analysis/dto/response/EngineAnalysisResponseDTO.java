package com.pollock.pollockhub.websocket.subscriber.engine_analysis.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class EngineAnalysisResponseDTO {

    private Integer score;
    private Integer mate;
    private Integer currentPv;
    private List<String> pvList;
}
