package com.pollock.pollockhub.common.exception;

public class BadGatewayException extends ServiceException {

    private static final BadGatewayException INSTANCE = new BadGatewayException();

    private BadGatewayException() {
        super(ErrorCode.BadGatewayException);
    }

    public static BadGatewayException getInstance() {
        return INSTANCE;
    }
}
