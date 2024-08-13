package com.ssafy.inmind.reservation.controller;



import com.ssafy.inmind.reservation.dto.*;
import com.ssafy.inmind.reservation.service.ReserveService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserve")
@RequiredArgsConstructor
@Tag(name = "상담 예약 컨트롤러", description = "상담 예약 CRUD API")
public class ReserveController {

    private final ReserveService reserveService;

    @Operation(summary = "상담 예약", description = "상담사에 대해 유저 상담 예약을 생성합니다.")
    @PostMapping()
    public ResponseEntity<Void> reserve(@Validated @RequestBody ReserveRequestDto request){
        reserveService.reserve(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "상담 예약 목록 조회", description = "상담사 또는 유저가 예약목록을 조회합니다.")
    @GetMapping("/all")
    public ResponseEntity<List<ReserveCoResponseDto>> getReserve(@RequestParam("userId") @Parameter(description = "유저번호") Long userId) {
        List<ReserveCoResponseDto> responseDtoList = reserveService.getReservation(userId);
        return ResponseEntity.ok(responseDtoList);
    }

    @Operation(summary = "상담 예약 조회", description = "하나의 예약 상세 정보를 조회합니다.")
    @GetMapping
    public ResponseEntity<ReserveUserResponseDto> getUserReserve(@RequestParam("reserveId") @Parameter(description = "예약번호") Long reserveId) {
        ReserveUserResponseDto responseDto = reserveService.getReserve(reserveId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @Operation(summary = "상담 예약 수정", description = "유저가 예약 내역을 수정합니다.")
    @PutMapping
    public ResponseEntity<Void> updateReserve(@Validated @RequestBody ReserveUpdateDto request){
        reserveService.updateReserve(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "상담 예약 취소", description = "예약된 상담을 취소합니다.")
    @DeleteMapping()
    public ResponseEntity<Void> deleteReservation(@RequestParam("reserveId") @Parameter(description = "예약 번호") Long reserveId){
        reserveService.deleteReserve(reserveId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
