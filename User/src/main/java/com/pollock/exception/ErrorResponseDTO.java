package com.pollock.exception;

import lombok.Getter;

@Getter
public class ErrorResponseDTO {

    private final int httpStatus;
    private final String code;
    private final String message;

    public ErrorResponseDTO(ErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}
