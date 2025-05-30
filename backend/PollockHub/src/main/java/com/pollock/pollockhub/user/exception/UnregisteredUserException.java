package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class UnregisteredUserException extends ServiceException {

    private static final UnregisteredUserException INSTANCE = new UnregisteredUserException();

    private UnregisteredUserException() {
        super(ErrorCode.UnregisteredUserException);
    }

    public static UnregisteredUserException getInstance() {
        return INSTANCE;
    }
}
