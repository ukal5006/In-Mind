package com.ssafy.inmind.management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DefaultTimeResponseDto {

    private long userIdx;
    private LocalTime availableTimeStartTime;
    private LocalTime availableTimeEndTime;
}
