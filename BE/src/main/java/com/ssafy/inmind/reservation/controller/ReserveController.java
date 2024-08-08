package com.ssafy.inmind.reservation.controller;



import com.ssafy.inmind.reservation.dto.ReserveDeleteDto;
import com.ssafy.inmind.reservation.dto.ReserveRequestDto;
import com.ssafy.inmind.reservation.dto.ReserveResponseDto;
import com.ssafy.inmind.reservation.dto.ReserveUpdateDto;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.reservation.service.ReserveService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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
    public ResponseEntity<Void> reserve(@RequestBody ReserveRequestDto request){
        reserveService.reserve(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "상담 예약 조회", description = "상담사가 자신에 대한 예약을 조회합니다.")
    @GetMapping("/all")
    public ResponseEntity<List<ReserveResponseDto>> getReserve(@RequestParam("counselorId") @Parameter(description = "상담사번호") Long counselorId) {
        List<ReserveResponseDto> responseDtoList = reserveService.getReservation(counselorId);
        return ResponseEntity.ok(responseDtoList);
    }

    @Operation(summary = "상담 예약 조회", description = "유저가 자신에 대한 예약을 조회합니다.")
    @GetMapping
    public ResponseEntity<ReserveResponseDto> getUserReserve(@RequestParam("userId") @Parameter(description = "유저번호") Long userId) {
        ReserveResponseDto responseDto = reserveService.getReserve(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @Operation(summary = "상담 예약 수정", description = "유저가 예약 내역을 수정합니다.")
    @PutMapping
    public ResponseEntity<Void> updateReserve(@RequestBody ReserveUpdateDto request){
        reserveService.updateReserve(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "상담 예약 취소", description = "예약된 상담을 취소합니다.")
    @DeleteMapping()
    public ResponseEntity<Void> deleteReservation(@RequestBody ReserveDeleteDto request){
        reserveService.deleteReserve(request.getReserveInfoIdx());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
