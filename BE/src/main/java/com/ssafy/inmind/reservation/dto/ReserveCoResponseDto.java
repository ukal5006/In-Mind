package com.ssafy.inmind.reservation.dto;


import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReserveCoResponseDto {
    private Long reserveInfoIdx;
    private Long reportIdx;
    private Long coIdx;
    private String coName;
    private String childName;
    private LocalDate reserveInfoDate;
    private LocalTime reserveInfoStartTime;
    private LocalTime reserveInfoEndTime;
    private LocalDateTime reserveInfoCreateTime;
    private String isEnd;
}
