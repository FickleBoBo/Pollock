package com.pollock.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UnAuthenticatedException(401, "UNAUTHORIZED", "로그인하지 않은 사용자입니다."),
    InternalServerErrorException(500, "INTERNAL_SERVER_ERROR", "내부 서버 에러");

    private final int httpStatus;
    private final String code;
    private final String message;
}
