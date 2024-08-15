package com.ssafy.inmind.chat.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomRequestDto {

    private Long coIdx;

    private Long userIdx;

    private LocalDateTime createdAt;

    private List<ChatInfoRequestDto> chatInfoList;

}
