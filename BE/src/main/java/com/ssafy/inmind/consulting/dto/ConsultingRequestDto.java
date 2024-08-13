package com.ssafy.inmind.consulting.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultingRequestDto {

    private Long reserveID;
    private LocalDate date;
    private String startTime;
    private String endTime;
}
