package com.pollock.pollockhub.common.template;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UnAuthenticatedException(UNAUTHORIZED, 401, "로그인하지 않은 사용자입니다."),
    InternalServerErrorException(INTERNAL_SERVER_ERROR, 500, "내부 서버 에러"),
    UserSessionRedisErrorException(INTERNAL_SERVER_ERROR, 500, "유저 세션 레디스 에러"),
    BadGatewayException(BAD_GATEWAY, 502, "프록시 서버 요청 실패"),

    UserNotFoundException(NOT_FOUND, 404, "해당 유저를 찾을 수 없습니다."),
    DuplicateNicknameException(CONFLICT, 409, "중복된 닉네임입니다."),

    GameNotFoundException(NOT_FOUND, 404, "해당 게임을 찾을 수 없습니다."),

    EngineNotFoundException(NOT_FOUND, 404, "해당 엔진을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;
}
