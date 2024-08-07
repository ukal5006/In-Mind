package com.ssafy.inmind.consulting.service;

import com.ssafy.inmind.consulting.dto.ConsultingResponseDto;
import com.ssafy.inmind.consulting.entity.History;
import com.ssafy.inmind.consulting.repository.ConsultingRepository;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.reservation.repository.ReserveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultingService {

    private final ConsultingRepository consultingRepository;
    private final ReserveRepository reserveRepository;

    public List<ConsultingResponseDto> getConsulting(Long userId) {
        List<History> histories = consultingRepository.findByReservation_User_Id(userId);

        return histories.stream()
                .map(history -> ConsultingResponseDto.builder()
                        .id(history.getId())
                        .reservation(history.getReservation())
                        .build())
                .collect(Collectors.toList());
    }

    public void saveConsulting(ConsultingResponseDto responseDto) {
        Reservation reservation = reserveRepository.findById(responseDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.BAD_REQUEST));
    }
}
