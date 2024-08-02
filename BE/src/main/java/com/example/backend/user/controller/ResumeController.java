package com.example.backend.user.controller;

import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.OrgRequestDto;
import com.example.backend.user.dto.ResumeRequestDto;
import com.example.backend.user.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping()
    public ResponseEntity<Void> addResume(@RequestBody ResumeRequestDto requestDto) throws RestApiException {
        resumeService.saveResume(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
