package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class AlreadyFollowingException extends ServiceException {

    private static final AlreadyFollowingException INSTANCE = new AlreadyFollowingException();

    private AlreadyFollowingException() {
        super(ErrorCode.AlreadyFollowingException);
    }

    public static AlreadyFollowingException getInstance() {
        return INSTANCE;
    }
}
