package com.pollock.pollockhub.common.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class BadGatewayException extends ServiceException {

    private static final BadGatewayException INSTANCE = new BadGatewayException();

    private BadGatewayException() {
        super(ErrorCode.BadGatewayException);
    }

    public static BadGatewayException getInstance() {
        return INSTANCE;
    }
}
