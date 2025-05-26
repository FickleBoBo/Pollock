package com.pollock.pollockhub.user.util;

import java.security.SecureRandom;

public class NicknameGenerator {

    private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    /**
     * BASE62 방식으로 12자리 랜덤 문자열 생성
     */
    public static String generateRandomNickname() {
        StringBuilder sb = new StringBuilder();
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < 12; i++) {
            int index = random.nextInt(BASE62.length());
            sb.append(BASE62.charAt(index));
        }

        return sb.toString();
    }
}
