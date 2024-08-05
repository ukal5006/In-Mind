package com.ssafy.inmind.reservation.service;


import com.ssafy.inmind.reservation.dto.UnavailableTimeDto;
import com.ssafy.inmind.reservation.entity.UnavailableTime;
import com.ssafy.inmind.reservation.repository.UnavailableTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UnavailableTimeService {

    private final UnavailableTimeRepository unavailableTimeRepository;

    public List<UnavailableTimeDto> getUnavailableTime(long coIdx){
        List<UnavailableTime> unavailableTime = unavailableTimeRepository.findByUserId(coIdx);

        return unavailableTime.stream()
                .map(UnavailableTimeDto::fromEntity)
                .collect(Collectors.toList());
    }
}
