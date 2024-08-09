package com.ssafy.inmind.chat.controller;

import com.ssafy.inmind.chat.dto.ChatRoomRequestDto;
import com.ssafy.inmind.chat.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "채팅 컨트롤러", description = "채팅 CRUD API")
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @Operation(summary = "채팅 정보 저장", description = "채팅방 저장 및 채팅내용을 저장합니다.")
    @PostMapping()
    public ResponseEntity<Void> addChat(@RequestBody ChatRoomRequestDto requestDto) {
        chatService.createChatRoom(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
