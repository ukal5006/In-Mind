package com.ssafy.inmind.gpt.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatGptMessage {

    private String role;
    private String content;
}
