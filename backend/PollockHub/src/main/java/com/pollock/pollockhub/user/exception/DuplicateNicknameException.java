package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class DuplicateNicknameException extends ServiceException {

    private static final DuplicateNicknameException INSTANCE = new DuplicateNicknameException();

    private DuplicateNicknameException() {
        super(ErrorCode.DuplicateNicknameException);
    }

    public static DuplicateNicknameException getInstance() {
        return INSTANCE;
    }
}
