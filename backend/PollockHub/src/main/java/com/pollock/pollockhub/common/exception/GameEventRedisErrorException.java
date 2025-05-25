package com.pollock.pollockhub.common.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class GameEventRedisErrorException extends ServiceException {

    private static final GameEventRedisErrorException INSTANCE = new GameEventRedisErrorException();

    private GameEventRedisErrorException() {
        super(ErrorCode.GameEventRedisErrorException);
    }

    public static GameEventRedisErrorException getInstance() {
        return INSTANCE;
    }
}
