package com.pollock.pollockhub.engine.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class EngineAnalysisResponseDTO {

    private String lastId;
    private List<String> messages;
}
