package com.ssafy.inmind.notification.service;

import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.entity.Notification;
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

    // 알림 스케줄러
    @Scheduled(cron = "0 0,30 * * * *")
    public void eventSchedule() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        String currentTime = now.format(DateTimeFormatter.ofPattern("HH:mm"));

        List<Notification> notifications = notificationRepository.findByScheduledDateAndScheduledTime(today, currentTime);

        if (notifications.isEmpty()) {
            System.out.println("알림이 없습니다.");
            return;
        }

        for (Notification notification : notifications) {
            Long userId = notification.getUser().getId();
            String emitterId = sseEmitterService.makeTimeIncludeId(userId);
            NotificationDto notificationDto = NotificationDto.builder()
                    .userId(userId)
                    .message(notification.getMessage())
                    .build();
            sseEmitterService.sendNotification(emitterId, notificationDto);
        }
    }

    public List<Notification> getUnreadNotification(Long userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, "N");
    }
}