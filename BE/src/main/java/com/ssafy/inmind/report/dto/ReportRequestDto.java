package com.ssafy.inmind.report.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportRequestDto {

    @NotNull(message = "아동 인덱스는 필수입니다.")
    private Long childIdx;

    @NotNull(message = "집 이미지는 필수입니다.")
    @Pattern(regexp = "^(http|https)://.*\\.(jpg|jpeg|png|gif)$", message = "집 이미지는 유효한 URL 형식이어야 합니다.")
    private String houseImage;

    @NotNull(message = "나무 이미지는 필수입니다.")
    @Pattern(regexp = "^(http|https)://.*\\.(jpg|jpeg|png|gif)$", message = "나무 이미지는 유효한 URL 형식이어야 합니다.")
    private String treeImage;

    @NotNull(message = "사람 이미지는 필수입니다.")
    @Pattern(regexp = "^(http|https)://.*\\.(jpg|jpeg|png|gif)$", message = "사람 이미지는 유효한 URL 형식이어야 합니다.")
    private String personImage;

    @NotNull(message = "배경은 필수입니다.")
    @Pattern(regexp = "^(http|https)://.*\\.(jpg|jpeg|png|gif)$", message = "배경은 유효한 URL 형식이어야 합니다.")
    private String background;

    @NotNull(message = "그림 흐름은 필수입니다.")
    private String drawingFlow;
}
