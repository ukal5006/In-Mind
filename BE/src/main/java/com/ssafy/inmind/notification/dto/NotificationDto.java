package com.ssafy.inmind.notification.dto;

import com.ssafy.inmind.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private long id;
    private Object message;
    private LocalDate scheduledDate;
    private String scheduledTime;
    private String isRead;
    private NotificationType notificationType;
    private LocalDateTime createdAt;
}
