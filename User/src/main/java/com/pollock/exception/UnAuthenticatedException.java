package com.pollock.exception;

public class UnAuthenticatedException extends ServiceException {

    private static final UnAuthenticatedException INSTANCE = new UnAuthenticatedException();

    private UnAuthenticatedException() {
        super(ErrorCode.UnAuthenticatedException);
    }

    public static UnAuthenticatedException getInstance() {
        return INSTANCE;
    }
}
