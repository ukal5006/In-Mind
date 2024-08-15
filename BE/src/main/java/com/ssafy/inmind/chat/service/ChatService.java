package com.ssafy.inmind.chat.service;

import com.ssafy.inmind.chat.dto.ChatInfoRequestDto;
import com.ssafy.inmind.chat.dto.ChatRoomRequestDto;
import com.ssafy.inmind.chat.entity.ChatInfo;
import com.ssafy.inmind.chat.entity.ChatRoom;
import com.ssafy.inmind.chat.repository.ChatInfoRepository;
import com.ssafy.inmind.chat.repository.ChatRoomRepository;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatInfoRepository chatInfoRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createChatRoom(ChatRoomRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        User counselor = userRepository.findById(requestDto.getCoIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        ChatRoom chatRoom = ChatRoom.builder()
                .user(user)
                .counselor(counselor)
                .createdAt(requestDto.getCreatedAt())
                .build();

        chatRoomRepository.save(chatRoom);

        List<ChatInfo> chatInfoList = requestDto.getChatInfoList().stream()
                .map(chatInfoRequestDto -> {
                            User postUser = userRepository.findById(chatInfoRequestDto.getPostIdx())
                                    .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
                            return ChatInfo.builder()
                                    .chatRoom(chatRoom)
                                    .postIdx(postUser)
                                    .content(chatInfoRequestDto.getContent())
                                    .createdAt(chatInfoRequestDto.getCreatedAt())
                                    .build();
                        }
                )
                .toList();
        chatInfoRepository.saveAll(chatInfoList);
    }
}
