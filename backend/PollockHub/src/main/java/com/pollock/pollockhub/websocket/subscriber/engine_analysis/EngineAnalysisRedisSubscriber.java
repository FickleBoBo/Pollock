package com.pollock.pollockhub.websocket.subscriber.engine_analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pollock.pollockhub.websocket.subscriber.engine_analysis.dto.response.EngineAnalysisResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.pollock.pollockhub.websocket.constant.WebSocketPath.TOPIC_ENGINE_ANALYSIS;

@Component
@RequiredArgsConstructor
public class EngineAnalysisRedisSubscriber implements MessageListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String channel = new String(message.getChannel());
        String channelKey = channel.substring(channel.lastIndexOf(":") + 1);

        try {
            EngineAnalysisResponseDTO responseDTO = objectMapper.readValue(message.getBody(), EngineAnalysisResponseDTO.class);
            messagingTemplate.convertAndSend(String.format(TOPIC_ENGINE_ANALYSIS, channelKey), responseDTO);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
