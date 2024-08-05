package com.example.backend.user.controller;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.ResumeRequestDto;
import com.example.backend.user.dto.ResumeResponseDto;
import com.example.backend.user.dto.ResumeUpdateRequestDto;
import com.example.backend.user.entity.Resume;
import com.example.backend.user.repository.ResumeRepository;
import com.example.backend.user.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping()
    public ResponseEntity<ResumeResponseDto> getResume(@RequestParam Long userId) {
        ResumeResponseDto resume = resumeService.getResume(userId);
        return ResponseEntity.ok(resume);
    }

    @PostMapping()
    public ResponseEntity<Void> addResume(@RequestBody ResumeRequestDto requestDto){
        resumeService.saveResume(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{resumeId}")
    public ResponseEntity<Void> updateResume(@PathVariable Long resumeId, @RequestBody ResumeUpdateRequestDto  requestDto){
        resumeService.updateResume(resumeId, requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long resumeId){
        resumeService.deleteResume(resumeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
