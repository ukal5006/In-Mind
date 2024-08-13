package com.ssafy.inmind.user.controller;

import com.ssafy.inmind.user.dto.ResumeRequestDto;
import com.ssafy.inmind.user.dto.ResumeResponseDto;
import com.ssafy.inmind.user.dto.ResumeUpdateRequestDto;
import com.ssafy.inmind.user.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "이력 컨트롤러", description = "이력 CRUD API")
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    @Operation(summary = "이력 조회", description = "이력을 조회합니다.")
    @GetMapping()
    public ResponseEntity<ResumeResponseDto> getResume(@RequestParam @Parameter(description = "회원아이디") Long userId) {
        ResumeResponseDto resume = resumeService.getResume(userId);
        return ResponseEntity.ok(resume);
    }

    @Operation(summary = "이력 등록", description = "이력을 등록합니다.")
    @PostMapping()
    public ResponseEntity<Void> addResume(@Validated @RequestBody ResumeRequestDto requestDto){
        resumeService.saveResume(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "이력 수정", description = "이력을 수정합니다.")
    @PutMapping("/{resumeId}")
    public ResponseEntity<Void> updateResume(@Validated @PathVariable @Parameter(description = "이력번호") Long resumeId, @RequestBody ResumeUpdateRequestDto requestDto){
        resumeService.updateResume(resumeId, requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "이력 삭제", description = "이력을 삭제합니다.")
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(@PathVariable @Parameter(description = "이력번호") Long resumeId){
        resumeService.deleteResume(resumeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
