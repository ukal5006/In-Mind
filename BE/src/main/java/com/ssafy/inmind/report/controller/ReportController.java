package com.ssafy.inmind.report.controller;

import com.ssafy.inmind.report.dto.ReportRequestDto;
import com.ssafy.inmind.report.service.ReportService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "검사 분석 컨트롤러", description = "검사 분석 CRUD API")
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;



                
}
