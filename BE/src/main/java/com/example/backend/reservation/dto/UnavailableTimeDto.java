package com.example.backend.reservation.dto;

import com.example.backend.reservation.entity.UnavailableTime;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class UnavailableTimeDto {

    private long id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    public static UnavailableTimeDto fromEntity(UnavailableTime unavailableTime) {
        return UnavailableTimeDto.builder()
                .id(unavailableTime.getId())
                .date(unavailableTime.getDate())
                .startTime(unavailableTime.getStartTime())
                .endTime(unavailableTime.getEndTime())
                .build();
    }
}