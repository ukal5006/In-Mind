package com.ssafy.inmind.report.controller;

import com.ssafy.inmind.gpt.service.GptService;
import com.ssafy.inmind.report.dto.*;
import com.ssafy.inmind.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "검사 분석 컨트롤러", description = "검사 분석 CRUD API")
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;
    private final RestTemplate restTemplate;
    private final GptService gptService;

    @Operation(summary = "검사 시작", description = "gpt response를 저장합니다.")
    @PostMapping("/start")
    public ResponseEntity<ReportEndResponseDto> addReport(@RequestBody ReportRequestDto requestDto) {
        String fastApi = "http://b301.xyz/interpretation";
        FastApiRequestDto fastApiRequestDto = FastApiRequestDto.builder()
                .treeUrl(requestDto.getTreeImage())
                .houseUrl(requestDto.getHouseImage())
                .personUrl(requestDto.getPersonImage())
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<FastApiRequestDto> requestEntity = new HttpEntity<>(fastApiRequestDto, headers);

        try {
            ResponseEntity<FastApiResponseDto> response = restTemplate.exchange(fastApi, HttpMethod.POST, requestEntity, FastApiResponseDto.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                FastApiResponseDto jsonData = response.getBody();
                System.out.println(jsonData.toString());
                String result;
                if(jsonData != null) {
                    result = gptService.generateResult(jsonData);
                    ReportEndResponseDto reportEndResponseDto = reportService.addReport(requestDto, jsonData, result);// 검사 결과 저장하고 바로 조회하게 해야하나?
                    return ResponseEntity.status(HttpStatus.OK).body(reportEndResponseDto);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } else {
                log.error("Error response from FastAPI: {}", response.getBody());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (RestClientException e) {
            log.error("Request to FastAPI failed: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
