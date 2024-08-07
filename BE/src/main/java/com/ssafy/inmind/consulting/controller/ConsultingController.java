package com.ssafy.inmind.consulting.controller;

import com.ssafy.inmind.consulting.dto.ConsultingResponseDto;
import com.ssafy.inmind.consulting.service.ConsultingService;
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
public class ConsultingController {

    private final ConsultingService consultingService;

    @GetMapping
    public ResponseEntity<List<ConsultingResponseDto>> getConsulting(@RequestParam Long userId) {
        List<ConsultingResponseDto> consultingDto = consultingService.getConsulting(userId);
        return ResponseEntity.status(HttpStatus.OK).body(consultingDto);
    }
}
