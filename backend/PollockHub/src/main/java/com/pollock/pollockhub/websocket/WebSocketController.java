package com.pollock.pollockhub.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/heartbeat/{channelKey}")
    public void heartbeat(@DestinationVariable String channelKey, String message) {
        messagingTemplate.convertAndSend("/topic/analysis." + channelKey, "pong");
    }
}
