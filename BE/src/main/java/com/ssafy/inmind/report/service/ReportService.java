package com.ssafy.inmind.report.service;

import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.child.repository.ChildRepository;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.report.dto.ChildDto;
import com.ssafy.inmind.report.dto.ReportDto;
import com.ssafy.inmind.report.dto.ReportListResponseDto;
import com.ssafy.inmind.report.dto.ReportResponseDto;
import com.ssafy.inmind.report.entity.Report;
import com.ssafy.inmind.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final ChildRepository childRepository;

    public ReportResponseDto getReport(Long reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        return ReportResponseDto.fromEntity(report);

    }

    public ReportListResponseDto getReportList(Long userId) {
        List<Child> children = childRepository.findChildrenByUserId(userId);

        List<ChildDto> childDto = children.stream()
                .map(child -> ChildDto.builder()
                        .childInfoIdx(child.getId())
                        .childInfoName(child.getName())
                        .reports(child.getReports().stream()
                                .map(report -> new ReportDto(report.getCreatedAt(), report.getResult()))
                                .collect(Collectors.toList()))
                        .build()).toList();

        return ReportListResponseDto.builder()
                .children(childDto)
                .build();
    }
}
