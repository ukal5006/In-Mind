package com.ssafy.inmind.management.controller;

import com.ssafy.inmind.management.dto.DefaultTimeResponseDto;
import com.ssafy.inmind.management.service.ManagementService;
import com.ssafy.inmind.management.dto.UnavailableTimeDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "상담 시간 컨트롤러", description = "상담 시간 CRUD API")
@RequestMapping("/management")
public class ManagementController {

    private final ManagementService managementService;

    @Operation(summary = "기본 상담 시간 조회", description = "상담사가 기본 상담 시간을 조회합니다.")
    @GetMapping("/default-time")
    public ResponseEntity<DefaultTimeResponseDto> getDefaultTime(@Validated @RequestParam @Parameter(description = "유저번호") Long userId) {
        DefaultTimeResponseDto responseDto = managementService.getDefaultTime(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @Operation(summary = "기본 상담 시간 수정", description = "상담사가 기본 상담 시간을 추가합니다.")
    @PutMapping("/default-time")
    public ResponseEntity<Void> updateDefaultTime(@Validated @RequestBody DefaultTimeResponseDto dto) {
        managementService.updateDefaultTime(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "기본 상담 시간 수정", description = "상담사가 기본 상담 시간을 추가합니다.")
    @DeleteMapping("/default-time")
    public ResponseEntity<Void> deleteDefaultTime(@Validated @RequestParam @Parameter(description = "유저번호") Long userId) {
        managementService.deleteDefaultTime(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @Operation(summary = "상담 불가능 시간 조회", description = "상담사 예약 시 상담사의 불가능 시간을 조회합니다.")
    @GetMapping("/unavailable-time")
    public ResponseEntity<List<UnavailableTimeDto>> getUnavailableTimes(
            @RequestParam Long counselorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<UnavailableTimeDto> dto = managementService.getUnavailableTime(counselorId, date);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @Operation(summary = "상담 불가능 시간 생성", description = "상담사가 상담 불가능 시간을 생성합니다.")
    @PostMapping("/unavailable-time")
    public ResponseEntity<UnavailableTimeDto> saveUnavailableTime(@Validated @RequestParam Long counselorId, @RequestBody @Parameter(description = "상담사 번호") UnavailableTimeDto dto) {
        managementService.saveUnavailableTime(counselorId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "상담 불가능 시간 삭제", description = "상담사가 상담 불가능 시간을 삭제합니다.")
    @DeleteMapping("/unavailable-time")
    public ResponseEntity<Void> deleteUnavailableTime(@RequestParam @Parameter(description = "상담 불가능 시간 번호") Long unavailableTimeIdx) {
        managementService.deleteUnavailableTime(unavailableTimeIdx);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

