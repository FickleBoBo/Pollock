package com.pollock.pollockhub.engine.dto.request;

import com.pollock.pollockhub.engine.router.EngineType;
import lombok.Getter;

@Getter
public class EngineAnalysisRequestDTO {

    private String channelKey;
    private EngineType engineType;
    private String fen;
    private Integer multipv;
    private Long movetime;
}
