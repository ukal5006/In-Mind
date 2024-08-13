package com.ssafy.inmind.report.controller;

import com.ssafy.inmind.report.dto.ReportListResponseDto;
import com.ssafy.inmind.report.dto.ReportRequestDto;
import com.ssafy.inmind.report.dto.ReportResponseDto;
import com.ssafy.inmind.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "검사 분석 컨트롤러", description = "검사 분석 CRUD API")
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "검사 시작", description = "gpt response를 저장합니다.")
    @PostMapping("/start")
    public ResponseEntity<Void> addReport(@RequestBody ReportRequestDto requestDto) {
        reportService.addReport(requestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    @Operation(summary = "검사 분석 조회", description = "검사 분석을 조회합니다.")
    @GetMapping("/{reportId}")
    public ResponseEntity<?> getReport(@PathVariable @Parameter(description = "검사분석번호") Long reportId, @RequestParam @Parameter(description = "유저번호") Long userId) {
        return ResponseEntity.ok(reportService.getReport(reportId, userId));
    }

    @Operation(summary = "분석 결과 목록 조회", description = "분석 결과 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ReportListResponseDto> getReportList(@RequestParam @Parameter(description = "유저번호") Long userId) {
        ReportListResponseDto reportList = reportService.getReportList(userId);
        return ResponseEntity.status(HttpStatus.OK).body(reportList);
    }

}
