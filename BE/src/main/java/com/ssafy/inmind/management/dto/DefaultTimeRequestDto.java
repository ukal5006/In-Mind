package com.ssafy.inmind.management.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DefaultTimeRequestDto {

    @NotNull(message = "사용자 ID는 필수입니다.")
    private Long userIdx;

    @NotNull(message = "시작 시간은 필수입니다.")
    private LocalTime availableTimeStartTime;

    @NotNull(message = "종료 시간은 필수입니다.")
    private LocalTime availableTimeEndTime;

    @AssertTrue(message = "종료 시간은 시작 시간보다 나중이어야 합니다.")
    public boolean isEndTimeAfterStartTime() {
        if (availableTimeStartTime != null && availableTimeEndTime != null) {
            return availableTimeEndTime.isAfter(availableTimeStartTime);
        }
        return true; // 검증할 수 없는 경우 true 반환
    }
}
