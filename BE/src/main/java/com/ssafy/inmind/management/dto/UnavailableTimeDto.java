package com.ssafy.inmind.management.dto;


import com.ssafy.inmind.management.entity.UnavailableTime;
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
}