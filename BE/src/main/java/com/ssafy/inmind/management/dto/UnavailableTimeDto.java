package com.ssafy.inmind.management.dto;


import com.ssafy.inmind.management.entity.UnavailableTime;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class UnavailableTimeDto {

    @NotNull(message = "예약 날짜는 필수입니다.")
    @Future(message = "예약 날짜는 현재보다 미래여야 합니다.")
    private LocalDate date;

    @NotBlank(message = "시작 시간은 필수입니다.")
    private String startTime;

    @NotBlank(message = "종료 시간은 필수입니다.")
    private String endTime;

    @AssertTrue(message = "종료 시간은 시작 시간보다 나중이어야 합니다.")
    public boolean isEndTimeAfterStartTime() {
        if (startTime != null && endTime != null) {
            return LocalTime.parse(endTime).isAfter(LocalTime.parse(startTime));
        }
        return true; // 검증할 수 없는 경우 true 반환
    }
}