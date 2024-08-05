package com.ssafy.inmind.notification.controller;


import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.entity.Notification;
import com.ssafy.inmind.notification.repository.EmitterRepository;
import com.ssafy.inmind.notification.service.NotificationService;
import com.ssafy.inmind.notification.service.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
public class NotifyController {

    private final SseEmitterService sseEmitterService;
    private final EmitterRepository emitterRepository;
    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam Long userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return sseEmitterService.subscribe(userId, lastEventId);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<NotificationDto>> getUnreadNotifications(@RequestParam Long userId) {
        List<NotificationDto> notificationDtoList = notificationService.getUnreadNotification(userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationDtoList);
    }

    @GetMapping
    public ResponseEntity<NotificationDto> getNotification(@RequestParam Long id) {
        NotificationDto notificationDto = notificationService.getNotification(id);
            return ResponseEntity.status(HttpStatus.OK).body(notificationDto);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteNotification(@RequestParam Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}