package com.pollock.pollockhub.engine.exception;

import com.pollock.pollockhub.common.exception.ErrorCode;
import com.pollock.pollockhub.common.exception.ServiceException;

public class EngineNotFoundException extends ServiceException {

    private static final EngineNotFoundException INSTANCE = new EngineNotFoundException();

    private EngineNotFoundException() {
        super(ErrorCode.EngineNotFoundException);
    }

    public static EngineNotFoundException getInstance() {
        return INSTANCE;
    }
}
