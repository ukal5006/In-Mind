package com.ssafy.inmind.gpt.service;

import com.ssafy.inmind.gpt.config.GptConfig;
import com.ssafy.inmind.gpt.dto.ChatGptMessage;
import com.ssafy.inmind.gpt.dto.GptRequestDto;
import com.ssafy.inmind.gpt.dto.GptResponseDto;
import com.ssafy.inmind.report.dto.FastApiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GptService {

    private final RestTemplate restTemplate;
    private final GptConfig gptConfig;

    // ChatGptMessage 생성 메서드
    public ChatGptMessage createMessage(String role, String content) {
        return ChatGptMessage.builder()
                .role(role)
                .content(content)
                .build();
    }

    // GPT API를 통해 문제를 생성하는 메서드
    public String generateResult(FastApiResponseDto jsonData) {
        // 메시지 리스트 생성
        List<ChatGptMessage> messages = new ArrayList<>();

        // system prompt 생성
        messages.add(createMessage("system", GptConfig.SYSTEM_CONTENT));

        // user prompt (입력된 텍스트 사용)
        messages.add(createMessage("user", jsonData.toString()));

        // GptRequestDto 생성
        GptRequestDto request = GptRequestDto.builder()
                .model(GptConfig.CHAT_MODEL)
                .temperature(GptConfig.TEMPERATURE)
                .stream(GptConfig.STREAM)
                .messages(messages)
                .build();

        // 헤더 설정 및 GPT API 호출
        HttpHeaders headers = new HttpHeaders();
        headers.add(GptConfig.AUTHORIZATION, GptConfig.BEARER + gptConfig.getApiKey());
        headers.add("Content-Type", GptConfig.MEDIA_TYPE);

        HttpEntity<GptRequestDto> requestHttpEntity = new HttpEntity<>(request, headers);

        // GPT API 호출 및 응답 받기
        GptResponseDto response = restTemplate.postForObject(GptConfig.CHAT_URL, requestHttpEntity, GptResponseDto.class);

        // 응답에서 첫 번째 메시지의 content 추출
        String content = response.getChoices().get(0).getMessage().getContent();

        return content;
    }
}
