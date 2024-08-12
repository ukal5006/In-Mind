package com.ssafy.inmind.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportDto {
    private Long reportIdx;
    private LocalDateTime reportCreatedAt;
    private String reportResult;
}