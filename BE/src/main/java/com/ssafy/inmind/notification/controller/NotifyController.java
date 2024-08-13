package com.ssafy.inmind.notification.controller;


import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.repository.EmitterRepository;
import com.ssafy.inmind.notification.service.NotificationService;
import com.ssafy.inmind.notification.service.SseEmitterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "알림 컨트롤러", description = "알림 CRUD API")
public class NotifyController {

    private final SseEmitterService sseEmitterService;
    private final NotificationService notificationService;

    @Operation(summary = "Sse 연결", description = "로그인 시 Sse 구독합니다.")
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam @Parameter(description = "유저번호") Long userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return sseEmitterService.subscribe(userId, lastEventId);
    }

    @Operation(summary = "읽지 않은 알림 조회", description = "유저가 읽지 않은 알림을 모두 조회합니다.")
    @GetMapping("/unread")
    public ResponseEntity<List<NotificationDto>> getUnreadNotifications(@RequestParam @Parameter(description = "유저번호") Long userId) {
        List<NotificationDto> notificationDtoList = notificationService.getUnreadNotification(userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationDtoList);
    }

    @Operation(summary = "알림 조회", description = "유저가 특정 알림을 조회합니다.")
    @GetMapping
    public ResponseEntity<NotificationDto> getNotification(@RequestParam @Parameter(description = "유저번호") Long id) {
        NotificationDto notificationDto = notificationService.getNotification(id);
            return ResponseEntity.status(HttpStatus.OK).body(notificationDto);
    }

    @Operation(summary = "알림 삭제", description = "유저가 특정 알림을 삭제합니다.")
    @DeleteMapping
    public ResponseEntity<Void> deleteNotification(@RequestParam @Parameter(description = "알림번호") Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "알림 일괄 조회", description = "유저가 알림을 모두 조회합니다.")
    @PostMapping("/all")
    public ResponseEntity<Void> updateNotification(@RequestBody List<Long> notificationIds) {
        notificationService.updateRead(notificationIds);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "알림 일괄 삭제", description = "유저가 알림을 모두 삭제합니다.")
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllNotifications(@RequestBody List<Long> notificationIds) {
        notificationService.deleteNotifications(notificationIds);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}