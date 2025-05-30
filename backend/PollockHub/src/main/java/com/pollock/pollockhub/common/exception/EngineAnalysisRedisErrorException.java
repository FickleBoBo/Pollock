package com.pollock.pollockhub.common.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class EngineAnalysisRedisErrorException extends ServiceException {

    private static final EngineAnalysisRedisErrorException INSTANCE = new EngineAnalysisRedisErrorException();

    private EngineAnalysisRedisErrorException() {
        super(ErrorCode.EngineAnalysisRedisErrorException);
    }

    public static EngineAnalysisRedisErrorException getInstance() {
        return INSTANCE;
    }
}
