package com.pollock.pollockhub.user.exception;

import com.pollock.pollockhub.common.template.ErrorCode;
import com.pollock.pollockhub.common.template.ServiceException;

public class SelfFollowNotAllowedException extends ServiceException {

    private static final SelfFollowNotAllowedException INSTANCE = new SelfFollowNotAllowedException();

    private SelfFollowNotAllowedException() {
        super(ErrorCode.SelfFollowNotAllowedException);
    }

    public static SelfFollowNotAllowedException getInstance() {
        return INSTANCE;
    }
}
