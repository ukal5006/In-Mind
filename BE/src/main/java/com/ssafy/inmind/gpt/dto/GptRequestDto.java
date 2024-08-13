package com.ssafy.inmind.gpt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@NoArgsConstructor
public class GptRequestDto implements Serializable {
    private String model;

    private Double temperature;
    private Boolean stream;
    private List<ChatGptMessage> messages;

    @Builder
    public GptRequestDto(String model, Double temperature, Boolean stream, List<ChatGptMessage> messages) {
        this.model = model;
        this.temperature = temperature;
        this.stream = stream;
        this.messages = messages;
    }
}