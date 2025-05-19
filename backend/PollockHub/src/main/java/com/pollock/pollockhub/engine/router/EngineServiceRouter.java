package com.pollock.pollockhub.engine.router;

import com.pollock.pollockhub.engine.exception.EngineNotFoundException;
import com.pollock.pollockhub.engine.service.EngineService;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class EngineServiceRouter {

    private final Map<EngineType, EngineService> engineServiceMap;

    public EngineServiceRouter(List<EngineService> engineServices) {
        this.engineServiceMap = new HashMap<>();

        for (EngineService engineService : engineServices) {
            engineServiceMap.put(engineService.getEngineType(), engineService);
        }
    }

    public EngineService resolve(EngineType engineType) {
        return Optional.ofNullable(engineServiceMap.get(engineType)).orElseThrow(EngineNotFoundException::getInstance);
    }
}
