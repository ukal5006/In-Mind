package com.ssafy.inmind.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgSearchRequestDto {

    @NotBlank(message = "검색 유형은 필수입니다.")
    private String type;

    @NotBlank(message = "검색 키워드는 필수입니다.")
    private String keyword;
}
