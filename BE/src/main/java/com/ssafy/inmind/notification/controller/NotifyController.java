package com.ssafy.inmind.notification.controller;


import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.repository.EmitterRepository;
import com.ssafy.inmind.notification.service.NotificationService;
import com.ssafy.inmind.notification.service.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
public class NotifyController {

    private final SseEmitterService sseEmitterService;
    private final EmitterRepository emitterRepository;
    private final NotificationService notificationService;

    // sse 구독
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam Long userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return sseEmitterService.subscribe(userId, lastEventId);
    }

    // 안읽은 알림 조회
    @GetMapping("/unread")
    public ResponseEntity<List<NotificationDto>> getUnreadNotifications(@RequestParam Long userId) {
        List<NotificationDto> notificationDtoList = notificationService.getUnreadNotification(userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationDtoList);
    }

    // 알림 조회
    @GetMapping
    public ResponseEntity<NotificationDto> getNotification(@RequestParam Long id) {
        NotificationDto notificationDto = notificationService.getNotification(id);
            return ResponseEntity.status(HttpStatus.OK).body(notificationDto);
    }

    // 알림 삭제
    @DeleteMapping
    public ResponseEntity<Void> deleteNotification(@RequestParam Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 모두 읽기 처리
    @PostMapping("/all")
    public ResponseEntity<Void> updateNotification(@RequestBody List<Long> notificationIds) {
        notificationService.updateRead(notificationIds);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 모두 삭제 처리
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllNotifications(@RequestBody List<Long> notificationIds) {
        notificationService.deleteNotifications(notificationIds);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}