package com.ssafy.inmind.chat.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatInfoRequestDto {

    private Long postIdx;

    private String content;

    private LocalDateTime createdAt;

}
