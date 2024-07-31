package com.example.backend.reservation.controller;


import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.reservation.service.ReserveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reserve")
@RequiredArgsConstructor
public class ReserveController {

    private final ReserveService reserveService;

    @PostMapping()
    public ResponseEntity<ReserveRequestDto> reserve(@Valid @RequestBody ReserveRequestDto request) {
        Reservation reservation = reserveService.reserve(request);
        ReserveRequestDto reservationDto = ReserveRequestDto.fromEntity(reservation);
        return ResponseEntity.ok(reservationDto);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringBuilder errorMessage = new StringBuilder("유효성 검사 실패: ");
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMessage.append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage())
                    .append("; ");
        });
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }
}
