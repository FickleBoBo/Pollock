package com.pollock.pollockhub.common.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class UnAuthenticatedException extends ServiceException {

    private static final UnAuthenticatedException INSTANCE = new UnAuthenticatedException();

    private UnAuthenticatedException() {
        super(ErrorCode.UnAuthenticatedException);
    }

    public static UnAuthenticatedException getInstance() {
        return INSTANCE;
    }
}
