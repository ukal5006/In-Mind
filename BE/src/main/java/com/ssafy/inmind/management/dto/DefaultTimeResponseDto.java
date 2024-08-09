package com.ssafy.inmind.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefaultTimeResponseDto {

    private Long userIdx;
    private LocalTime availableTimeStartTime;
    private LocalTime availableTimeEndTime;
}
