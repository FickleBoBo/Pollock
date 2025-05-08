package com.pollock.pollockhub.engine.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RedisStreamKeyResponseDTO {

    private String streamKey;
}
