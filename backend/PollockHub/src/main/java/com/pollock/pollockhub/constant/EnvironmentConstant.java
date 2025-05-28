package com.pollock.pollockhub.constant;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class EnvironmentConstant {

    private final String defaultProfileImageUrl;

    public EnvironmentConstant(@Value("${custom.user.default-profile-image-url}") String defaultProfileImageUrl) {
        this.defaultProfileImageUrl = defaultProfileImageUrl;
    }
}
