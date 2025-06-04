package com.pollock.pollockhub.constant;

public class ChannelConstant {

    private ChannelConstant() {
    }

    // WebSocket Topic
    public static final String TOPIC_PING = "/topic/ping/%s";

    public static final String TOPIC_SESSION_COUNT = "/topic/session/count";
    public static final String TOPIC_GAME_COUNT = "/topic/game/count";

    public static final String TOPIC_GAME = "/topic/game/%s";

    public static final String TOPIC_MATCH = "/topic/match/%s";

    public static final String TOPIC_ENGINE_ANALYSIS = "/topic/engine/analysis/%s";

    // Redis Key
    public static final String GAME_KEY = "game:%s";

    public static final String MATCH_KEY = "match:%s:%d";

    // Redis Pub/Sub Pattern
    public static final String SUBSCRIBE_ENGINE_ANALYSIS_PATTERN = "engine:*";
}
