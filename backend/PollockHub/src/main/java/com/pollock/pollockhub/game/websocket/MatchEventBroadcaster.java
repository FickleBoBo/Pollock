package com.pollock.pollockhub.game.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static com.pollock.pollockhub.constant.ChannelConstant.TOPIC_MATCH;

@Component
@RequiredArgsConstructor
public class MatchEventBroadcaster {

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastMatch(String nickname, String gameId) {
        messagingTemplate.convertAndSend(String.format(TOPIC_MATCH, nickname), gameId);
    }
}
