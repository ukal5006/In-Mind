package com.example.backend.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class AvailableTimeDto {
    private LocalTime startTime;
    private LocalTime endTime;
}