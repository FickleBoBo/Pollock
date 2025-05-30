package com.pollock.pollockhub.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import static com.pollock.pollockhub.constant.ChannelConstant.TOPIC_PING;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/heartbeat/{channelKey}")
    public void heartbeat(@DestinationVariable String channelKey) {
        messagingTemplate.convertAndSend(String.format(TOPIC_PING, channelKey), "pong");
    }
}
