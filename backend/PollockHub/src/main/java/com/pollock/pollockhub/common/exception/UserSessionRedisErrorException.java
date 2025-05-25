package com.pollock.pollockhub.common.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class UserSessionRedisErrorException extends ServiceException {

    private static final UserSessionRedisErrorException INSTANCE = new UserSessionRedisErrorException();

    private UserSessionRedisErrorException() {
        super(ErrorCode.UserSessionRedisErrorException);
    }

    public static UserSessionRedisErrorException getInstance() {
        return INSTANCE;
    }
}
