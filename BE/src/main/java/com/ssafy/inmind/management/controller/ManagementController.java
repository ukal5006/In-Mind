package com.ssafy.inmind.management.controller;

import com.ssafy.inmind.management.dto.DefaultTimeResponseDto;
import com.ssafy.inmind.management.service.ManagementService;
import com.ssafy.inmind.management.dto.UnavailableTimeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/management")
public class ManagementController {

    private final ManagementService managementService;

    @GetMapping("/unavailable-time/{counselorId}")
    public ResponseEntity<List<UnavailableTimeDto>> getUnavailableTimes(@PathVariable long counselorId) {
        List<UnavailableTimeDto> dto = managementService.getUnavailableTime(counselorId);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PostMapping("/default-time")
    public ResponseEntity<DefaultTimeResponseDto> getDefaultTime(@RequestBody DefaultTimeResponseDto dto) {
        managementService.saveDefaultTime(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/unavailable-time")
    public ResponseEntity<UnavailableTimeDto> saveUnavailableTime(@RequestBody UnavailableTimeDto dto) {
        managementService.saveUnavailableTime(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/unavailable-time")
    public ResponseEntity<Void> deleteUnavailableTime(@RequestParam Long unavailableTimeIdx) {
        managementService.deleteUnavailableTime(unavailableTimeIdx);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
