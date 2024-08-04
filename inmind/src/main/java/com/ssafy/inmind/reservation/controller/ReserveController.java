package com.ssafy.inmind.reservation.controller;


import com.ssafy.inmind.reservation.dto.ReserveDeleteDto;
import com.ssafy.inmind.reservation.dto.ReserveRequestDto;
import com.ssafy.inmind.reservation.dto.ReserveResponseDto;
import com.ssafy.inmind.reservation.dto.ReserveUpdateDto;
import com.ssafy.inmind.reservation.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserve")
@RequiredArgsConstructor
public class ReserveController {

    private final ReserveService reserveService;

    @PostMapping()
    public ResponseEntity<Void> reserve(@RequestBody ReserveRequestDto request){
        reserveService.reserve(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<ReserveResponseDto>> getReserve(@RequestParam("userId") long userId) {
        List<ReserveResponseDto> responseDtoList = reserveService.getReservation(userId);
        return ResponseEntity.ok(responseDtoList);
    }

    @PutMapping
    public ResponseEntity<Void> updateReserve(@RequestBody ReserveUpdateDto request){
        reserveService.updateReserve(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteReservation(@RequestBody ReserveDeleteDto request){
        reserveService.deleteReserve(request.getReserveInfoIdx());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
