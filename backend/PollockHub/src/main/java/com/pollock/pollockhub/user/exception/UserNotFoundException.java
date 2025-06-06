package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class UserNotFoundException extends ServiceException {

    private static final UserNotFoundException INSTANCE = new UserNotFoundException();

    private UserNotFoundException() {
        super(ErrorCode.UserNotFoundException);
    }

    public static UserNotFoundException getInstance() {
        return INSTANCE;
    }
}
