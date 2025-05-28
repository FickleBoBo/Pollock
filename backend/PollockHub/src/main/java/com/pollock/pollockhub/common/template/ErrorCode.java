package com.pollock.pollockhub.common.template;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@ToString
@AllArgsConstructor
public enum ErrorCode {

    // Common
    UnAuthenticatedException(UNAUTHORIZED, 401, "로그인하지 않은 사용자입니다."),
    InternalServerErrorException(INTERNAL_SERVER_ERROR, 500, "내부 서버에서 에러가 발생했습니다."),
    BadGatewayException(BAD_GATEWAY, 502, "프록시 서버 요청이 실패했습니다."),

    UserSessionRedisErrorException(INTERNAL_SERVER_ERROR, 500, "유저 세션 레디스에 에러가 발생했습니다."),
    GameEventRedisErrorException(INTERNAL_SERVER_ERROR, 500, "게임 이벤트 레디스에 에러가 발생했습니다."),
    EngineAnalysisRedisErrorException(INTERNAL_SERVER_ERROR, 500, "엔진 분석 레디스에 에러가 발생했습니다."),

    // User Domain
    UserNotFoundException(NOT_FOUND, 404, "해당 유저를 찾을 수 없습니다."),
    UnregisteredUserException(FORBIDDEN, 403, "아직 회원가입을 하지 않은 유저입니다."),
    InvalidNicknameException(BAD_REQUEST, 400, "유효하지 않은 양식의 닉네임입니다."),
    DuplicateNicknameException(CONFLICT, 409, "중복된 닉네임입니다."),
    SelfFollowNotAllowedException(BAD_REQUEST, 400, "자기 자신을 팔로우 할 수 없습니다."),
    AlreadyFollowingException(BAD_REQUEST, 400, "이미 팔로우한 유저입니다."),

    // Game Domain
    GameNotFoundException(NOT_FOUND, 404, "해당 게임을 찾을 수 없습니다."),

    // Engine Domain
    EngineNotFoundException(NOT_FOUND, 404, "해당 엔진을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;
}
