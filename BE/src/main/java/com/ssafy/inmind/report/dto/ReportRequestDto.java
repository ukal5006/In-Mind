package com.ssafy.inmind.report.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportRequestDto {

    private Long childIdx;

    private String img;

    private String background;

    private String drawingFlow;

    private String result;

}
