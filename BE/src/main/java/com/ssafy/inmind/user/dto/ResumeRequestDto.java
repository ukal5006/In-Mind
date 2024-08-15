package com.ssafy.inmind.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResumeRequestDto {

    @NotNull(message = "사용자 인덱스는 필수입니다.")
    private Long userIdx;

    @NotBlank(message = "이력서 정보는 필수입니다.")
    private String info;
}
