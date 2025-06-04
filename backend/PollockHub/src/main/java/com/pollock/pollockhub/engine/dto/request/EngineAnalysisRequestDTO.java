package com.pollock.pollockhub.engine.dto.request;

import com.pollock.pollockhub.engine.router.EngineType;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EngineAnalysisRequestDTO {

    private String channelKey;
    private EngineType engineType;
    private String fen;
    private int multipv;
    private int movetime;
}
