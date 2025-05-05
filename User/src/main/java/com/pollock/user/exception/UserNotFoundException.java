package com.pollock.user.exception;

public class UserNotFoundException extends ServiceException {

    private static final UserNotFoundException INSTANCE = new UserNotFoundException();

    private UserNotFoundException() {
        super(ErrorCode.UserNotFoundException);
    }

    public static UserNotFoundException getInstance() {
        return INSTANCE;
    }
}
