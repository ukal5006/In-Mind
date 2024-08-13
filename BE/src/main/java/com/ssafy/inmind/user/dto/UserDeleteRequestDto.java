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
public class UserDeleteRequestDto {
    @NotNull(message = "사용자 인덱스는 필수입니다.")
    private Long userIdx;

    @NotBlank(message = "사용자 상태는 필수입니다.")
    private String userIsLive;
}
