package com.ssafy.inmind.consulting.controller;

import com.ssafy.inmind.consulting.dto.ConsultingResponseDto;
import com.ssafy.inmind.consulting.service.ConsultingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/consulting")
@Tag(name = "화상 상담 컨트롤러", description = "화상 상담 CRUD API")
public class ConsultingController {

    private final ConsultingService consultingService;

    @Operation(summary = "화상 상담 기록 조회", description = "상담사가 화상 상담 기록을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<ConsultingResponseDto>> getConsulting(@RequestParam Long userId) {
        List<ConsultingResponseDto> consultingDto = consultingService.getConsulting(userId);
        return ResponseEntity.status(HttpStatus.OK).body(consultingDto);
    }
}
