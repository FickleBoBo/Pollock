package com.pollock.pollockhub.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorResponseDTO {

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    public ErrorResponseDTO(ErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}
