package com.pollock.pollockhub.game.exception;

import com.pollock.pollockhub.common.ErrorCode;
import com.pollock.pollockhub.common.ServiceException;

public class GameNotFoundException extends ServiceException {

    private static final GameNotFoundException INSTANCE = new GameNotFoundException();

    private GameNotFoundException() {
        super(ErrorCode.GameNotFoundException);
    }

    public static GameNotFoundException getInstance() {
        return INSTANCE;
    }
}
