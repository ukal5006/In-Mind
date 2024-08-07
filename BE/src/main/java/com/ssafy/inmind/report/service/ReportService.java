package com.ssafy.inmind.report.service;

import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.report.dto.ReportResponseDto;
import com.ssafy.inmind.report.entity.Report;
import com.ssafy.inmind.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportResponseDto getReport(Long reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        return ReportResponseDto.fromEntity(report);

    }

}
