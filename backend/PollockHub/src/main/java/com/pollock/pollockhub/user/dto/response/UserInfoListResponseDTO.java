package com.pollock.pollockhub.user.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class UserInfoListResponseDTO {

    private Map<String, UserInfo> users;
}
