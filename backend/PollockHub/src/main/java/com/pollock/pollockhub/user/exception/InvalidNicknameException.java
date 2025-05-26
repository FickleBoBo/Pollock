package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class InvalidNicknameException extends ServiceException {

    private static final InvalidNicknameException INSTANCE = new InvalidNicknameException();

    private InvalidNicknameException() {
        super(ErrorCode.InvalidNicknameException);
    }

    public static InvalidNicknameException getInstance() {
        return INSTANCE;
    }
}
