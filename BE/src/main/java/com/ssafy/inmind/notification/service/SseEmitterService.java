package com.ssafy.inmind.notification.service;


import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.yaml.snakeyaml.emitter.Emitter;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SseEmitterService {

    private static final Long TIMEOUT = 10 * 1000L;

    private final EmitterRepository emitterRepository;

    public SseEmitter subscribe(Long userId, String lastEventId) {
        // emitter 생성
        String emitterId = makeTimeIncludeId(userId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(TIMEOUT));

        // TimeOut이나 완료 시 연결 해제
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 연결 시 503 에러 방지용 더미 이벤트 전송
        initialSend(emitterId, emitter, "알림 서버 연결 성공. [userId" + userId + "]");

        // 클라이언트가 미수신한 event 목록 존재 시 전송(event 유실 방지)
        if (hasLostData(lastEventId)) {
            sendLostData(lastEventId, userId, emitterId);
        }

        return emitter;
    }

    private void initialSend(String eventId, SseEmitter emitter, Object object) {
        SseEmitter sseEmitter = emitterRepository.findById(eventId);

        try {
            emitter.send(SseEmitter.event()
                    .name("sse")
                    .id(eventId)
                    .data(object));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // emitterId 생성
    public String makeTimeIncludeId(Long userId) {
        return userId.toString() + "_" + System.currentTimeMillis();
    }

    // 연결 시 알림 처리
    private void sendInitialNotification(Long userId, String emitterId) {
        NotificationDto notificationDto = NotificationDto.builder()
                    .message("EventStream Created. [userId=" + userId + "]")
                    .build();
        sendNotification(emitterId, notificationDto);
    }

    public void sendNotification(String emitterId, NotificationDto notificationDto) {
        SseEmitter sseEmitter = emitterRepository.findById(emitterId);
        if (sseEmitter != null) {
            try {
                sseEmitter.send(SseEmitter.event()
                        .id(emitterId)
                        .name("sse")
                        .data(notificationDto));
            } catch (IOException exception) {
                sseEmitter.completeWithError(exception);
                emitterRepository.deleteById(emitterId);
            }
        }
    }

    // 미수신 이벤트 확인
    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    // 미수신 이벤트 송신
    private void sendLostData(String lastEventId, Long userId, String emitterId) {
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(userId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> {
                    NotificationDto notificationDto = NotificationDto.builder()
                            .message(entry.getValue())
                            .build();
                    sendNotification(emitterId, notificationDto);
                });
    }
}
