package com.example.backend.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class ReserveUpdateDto {

    private long reserveInfoIdx;
    private LocalDate reserveInfoDate;
    private LocalTime reserveInfoStartTime;
    private LocalTime reserveInfoEndTime;
}
