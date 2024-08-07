package com.ssafy.inmind.consulting.service;

import com.ssafy.inmind.consulting.dto.ConsultingResponseDto;
import com.ssafy.inmind.consulting.entity.History;
import com.ssafy.inmind.consulting.repository.ConsultingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultingService {

    private final ConsultingRepository consultingRepository;

    @Transactional
    public List<ConsultingResponseDto> getConsulting(Long userId) {
        List<History> histories = consultingRepository.findByReservation_User_Id(userId);

        return histories.stream()
                .map(history -> ConsultingResponseDto.builder()
                        .id(history.getId())
                        .reservation(history.getReservation())
                        .build())
                .collect(Collectors.toList());
    }
}
