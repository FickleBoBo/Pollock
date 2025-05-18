package com.pollock.pollockhub.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/heartbeat")
    public void heartbeat(String message) {
        messagingTemplate.convertAndSend("/topic/ping", "pong");
    }
}
