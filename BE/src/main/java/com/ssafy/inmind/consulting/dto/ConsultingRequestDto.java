package com.ssafy.inmind.consulting.dto;


import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultingRequestDto {

    @NotNull(message = "예약 ID는 필수입니다.")
    private Long reserveID;

    @NotNull(message = "날짜는 필수입니다.")
    @Future(message = "날짜는 현재보다 미래여야 합니다.")
    private LocalDate date;

    @NotBlank(message = "시작 시간은 필수입니다.")
    private String startTime;

    @NotBlank(message = "종료 시간은 필수입니다.")
    private String endTime;
}
