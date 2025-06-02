package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class DuplicatedNicknameException extends ServiceException {

    private static final DuplicatedNicknameException INSTANCE = new DuplicatedNicknameException();

    private DuplicatedNicknameException() {
        super(ErrorCode.DuplicatedNicknameException);
    }

    public static DuplicatedNicknameException getInstance() {
        return INSTANCE;
    }
}
