package com.example.backend.reservation.dto;

import com.example.backend.reservation.entity.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReserveResponseDto {
    private int reserveInfoIdx;
    private String coName;
    private LocalDate reserveInfoDate;
    private LocalTime reserveInfoStartTime;
    private LocalTime reserveInfoEndTime;

    public static ReserveResponseDto fromEntity(Reservation reservation) {
        return ReserveResponseDto.builder()
                .reserveInfoIdx((int) reservation.getId())
                .coName(reservation.getCounselor().getName())
                .reserveInfoDate(reservation.getLocalDate())
                .reserveInfoStartTime(reservation.getStartTime())
                .reserveInfoEndTime(reservation.getEndTime())
                .build();
    }
}
