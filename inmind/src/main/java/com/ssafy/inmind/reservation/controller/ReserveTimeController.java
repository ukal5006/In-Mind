package com.ssafy.inmind.reservation.controller;

import com.example.backend.reservation.dto.UnavailableTimeDto;
import com.example.backend.reservation.service.UnavailableTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/unavailable-time")
@RequiredArgsConstructor
public class ReserveTimeController {

    private final UnavailableTimeService unavailableTimeService;

    @GetMapping("{coIdx}")
    public ResponseEntity<List<UnavailableTimeDto>> getUnavailableTimes(@PathVariable long coIdx) {
        List<UnavailableTimeDto> dto = unavailableTimeService.getUnavailableTime(coIdx);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

}
