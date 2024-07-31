package com.example.backend.reservation.dto;


import com.example.backend.reservation.entity.Reservation;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;

@Getter @Setter
public class ReserveRequestDto {

    @NotNull(message = "User ID는 필수입니다.")
    private long userIdx;

    @NotNull(message = "Counselor ID는 필수입니다.")
    private long coIdx;

    @NotNull(message = "예약 날짜는 필수입니다.")
    @Future(message = "예약 날짜는 현재 시점 이후여야 합니다.")
    private LocalDate reserveInfoDate;

    @NotNull(message = "시작 시간은 필수입니다.")
    private LocalTime reserveInfoStartTime;

    @NotNull(message = "종료 시간은 필수입니다.")
    private LocalTime reserveInfoEndTime;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReserveRequestDto fromEntity(Reservation reservation) {
        ReserveRequestDto dto = new ReserveRequestDto();
        dto.setUserIdx(reservation.getUser().getId());
        dto.setCoIdx(reservation.getCounselor().getId());
        dto.setReserveInfoDate(reservation.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        dto.setReserveInfoStartTime(reservation.getStartTime());
        dto.setReserveInfoEndTime(reservation.getEndTime());
        dto.setCreatedAt(reservation.getCreatedAt());
        dto.setUpdatedAt(reservation.getUpdatedAt());
        return dto;
    }
}
