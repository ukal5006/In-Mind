package com.ssafy.inmind.notification.service;

import com.ssafy.inmind.notification.entity.Notification;
import com.ssafy.inmind.notification.repository.EmitterRepository;
import com.ssafy.inmind.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SseEmitterService sseEmitterService;
    private final NotificationRepository notificationRepository;
    private final EmitterRepository emitterRepository;

    // 알림 스케줄러
    @Scheduled(cron = "0 0 * * * *")
    public void eventSchedule() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        String currentTime = now.format(DateTimeFormatter.ofPattern("HH:mm"));

        List<Notification> notifications = notificationRepository.findByScheduledDateAndScheduledTime(today, currentTime);

        for (Notification notification : notifications) {
            Long userId = notification.getUser().getId();
            String emitterId = sseEmitterService.makeTimeIncludeId(userId);
            sseEmitterService.sendNotification(emitterId, notification.getMessage(), userId);
        }
    }
}