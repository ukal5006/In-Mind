package com.ssafy.inmind.user.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewRequestDto {

    @NotNull(message = "예약 인덱스는 필수입니다.")
    private Long reserveIdx;

    @NotBlank(message = "이름은 필수입니다.")
    private String name;

    @NotNull(message = "회사 인덱스는 필수입니다.")
    private Long coIdx;

    @NotBlank(message = "리뷰 내용은 필수입니다.")
    private String content;

    @Max(value = 5, message = "점수는 5 이하여야 합니다.")
    private int score;

}
