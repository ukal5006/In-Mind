package com.ssafy.inmind.report.dto;

import com.ssafy.inmind.report.entity.Report;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportCoResponseDto {

    private String objectResult;

    private String reportResult;

    private String houseImage;

    private String treeImage;

    private String personImage;

    private String drawingFlow;

    public static ReportCoResponseDto fromEntity(Report report) {
        return ReportCoResponseDto.builder()
                .objectResult(report.getObjectResult())
                .reportResult(report.getResult())
                .houseImage(report.getHouseImage())
                .treeImage(report.getTreeImage())
                .personImage(report.getPersonImage())
                .drawingFlow(report.getDrawingFlow())
                .build();
    }
}
