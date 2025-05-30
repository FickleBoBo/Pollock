package com.pollock.pollockhub.constant;

public class ChannelConstant {

    private ChannelConstant() {
    }

    // WebSocket Topics
    public static final String TOPIC_PING = "/topic/ping/%s";

    public static final String TOPIC_SESSION_COUNT = "/topic/session-count";
    public static final String TOPIC_GAME_COUNT = "/topic/game-count";

    public static final String TOPIC_ENGINE_ANALYSIS = "/topic/analysis/%s";

    // Redis Pub/Sub Channels
    public static final String SUBSCRIBE_ENGINE_ANALYSIS_PATTERN = "engine:*";
}
