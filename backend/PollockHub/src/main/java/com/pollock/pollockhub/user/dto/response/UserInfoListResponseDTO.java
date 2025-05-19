package com.pollock.pollockhub.user.dto.response;

import com.pollock.pollockhub.game.entity.PlayerColor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class UserInfoListResponseDTO {

    private Map<PlayerColor, UserInfo> users;
}
