package com.ssafy.inmind.report.dto;

import com.ssafy.inmind.report.entity.Report;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportResponseDto {

    private String reportResult;

    private String reportImage;

    public static ReportResponseDto fromEntity(Report report) {
        return ReportResponseDto.builder()
                .reportResult(report.getResult())
                .reportImage(report.getImage())
                .build();
    }
}
