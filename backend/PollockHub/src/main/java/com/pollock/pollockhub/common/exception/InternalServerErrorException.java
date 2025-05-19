package com.pollock.pollockhub.common.exception;

public class InternalServerErrorException extends ServiceException {

    private static final InternalServerErrorException INSTANCE = new InternalServerErrorException();

    private InternalServerErrorException() {
        super(ErrorCode.InternalServerErrorException);
    }

    public static InternalServerErrorException getInstance() {
        return INSTANCE;
    }
}
