package com.pollock.pollockhub.common.template;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString(callSuper = true)
public class ServiceException extends RuntimeException {

    private final ErrorCode errorCode;

    public ServiceException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
