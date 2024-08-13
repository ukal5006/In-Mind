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

    private LocalDate date;
    private String startTime;
    private String endTime;
}