package com.pollock.pollockhub.game.exception;

import com.pollock.pollockhub.common.exception.ErrorCode;
import com.pollock.pollockhub.common.exception.ServiceException;

public class GameNotFoundException extends ServiceException {

    private static final GameNotFoundException INSTANCE = new GameNotFoundException();

    private GameNotFoundException() {
        super(ErrorCode.GameNotFoundException);
    }

    public static GameNotFoundException getInstance() {
        return INSTANCE;
    }
}
