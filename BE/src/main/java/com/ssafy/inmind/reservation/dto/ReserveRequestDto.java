package com.ssafy.inmind.reservation.dto;


import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReserveRequestDto {

    @NotNull(message = "User ID는 필수입니다.")
    private Long userIdx;

    @NotNull(message = "Counselor ID는 필수입니다.")
    private Long coIdx;

    @NotNull(message = "Report ID는 필수입니다.")
    private Long reportIdx;

    @NotNull(message = "예약 날짜는 필수입니다.")
    @Future(message = "예약 날짜는 현재 시점 이후여야 합니다.")
    private LocalDate reserveInfoDate;

    @NotNull(message = "시작 시간은 필수입니다.")
    private String reserveInfoStartTime;

    @NotNull(message = "종료 시간은 필수입니다.")
    private String reserveInfoEndTime;

}
