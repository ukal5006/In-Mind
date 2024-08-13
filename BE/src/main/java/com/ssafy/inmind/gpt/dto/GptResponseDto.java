package com.ssafy.inmind.gpt.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
public class GptResponseDto {
    private List<Choice> choices;

    @Getter
    @Setter
    public static class Choice {
        private ChatGptMessage message;


    }
}
