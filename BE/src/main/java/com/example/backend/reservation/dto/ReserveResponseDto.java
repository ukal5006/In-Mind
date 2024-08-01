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
    private LocalDateTime reserveInfoCreatedAt;

    public static ReserveResponseDto fromEntity(Reservation reservation) {
        return ReserveResponseDto.builder()
                .reserveInfoIdx((int) reservation.getId())  // 예약 정보 인덱스
                .coName(reservation.getCounselor().getName()) // 상담사 이름
                .reserveInfoDate(reservation.getLocalDate()) // 예약 날짜
                .reserveInfoStartTime(reservation.getStartTime()) // 예약 시작 시간
                .reserveInfoEndTime(reservation.getEndTime()) // 예약 종료 시간
                .reserveInfoCreatedAt(reservation.getCreatedAt()) // 예약 생성 시간
                .build();
    }
}
