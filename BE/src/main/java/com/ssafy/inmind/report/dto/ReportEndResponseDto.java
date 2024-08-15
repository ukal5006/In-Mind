package com.ssafy.inmind.report.dto;

import com.ssafy.inmind.report.entity.Report;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportEndResponseDto {

    private Long reportIdx;

    private String reportResult;

    private String houseImage;

    private String treeImage;

    private String personImage;

    public static ReportEndResponseDto fromEntity(Report report) {
        return ReportEndResponseDto.builder()
                .reportIdx(report.getId())
                .reportResult(report.getResult())
                .houseImage(report.getHouseImage())
                .treeImage(report.getTreeImage())
                .personImage(report.getPersonImage())
                .build();
    }
}