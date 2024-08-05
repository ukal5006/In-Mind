package com.ssafy.inmind.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private long id;
    private long userId;
    private Object message;
    private LocalDate scheduledDate;
    private String scheduledTime;
}
