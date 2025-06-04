package com.pollock.pollockhub.engine.subscriber;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class EngineAnalysisResponseDTO {

    private Integer score;
    private Integer mate;
    private int currentPv;
    private List<String> pvList;
}
