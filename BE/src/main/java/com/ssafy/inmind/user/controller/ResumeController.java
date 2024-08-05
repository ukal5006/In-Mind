package com.ssafy.inmind.user.controller;


import com.ssafy.inmind.user.dto.ResumeRequestDto;
import com.ssafy.inmind.user.dto.ResumeResponseDto;
import com.ssafy.inmind.user.dto.ResumeUpdateRequestDto;
import com.ssafy.inmind.user.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Void> updateResume(@PathVariable Long resumeId, @RequestBody ResumeUpdateRequestDto requestDto){
        resumeService.updateResume(resumeId, requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long resumeId){
        resumeService.deleteResume(resumeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
