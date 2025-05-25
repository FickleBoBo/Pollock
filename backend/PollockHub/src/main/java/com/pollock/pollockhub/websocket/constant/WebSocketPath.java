package com.pollock.pollockhub.websocket.constant;

public class WebSocketPath {
    public static final String TOPIC_SESSION_COUNT = "/topic/sessions";
    public static final String TOPIC_GAME_COUNT = "/topic/games";

    public static final String TOPIC_PING = "/topic/ping/%s";
    public static final String TOPIC_ENGINE_ANALYSIS = "/topic/analysis/%s";

    public static final String SUBSCRIBE_ENGINE_ANALYSIS_PATTERN = "engine:*";
}
