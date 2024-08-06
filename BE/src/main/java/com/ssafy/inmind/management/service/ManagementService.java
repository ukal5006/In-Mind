package com.ssafy.inmind.management.service;

import com.ssafy.inmind.management.dto.DefaultTimeResponseDto;
import com.ssafy.inmind.management.entity.DefaultTime;
import com.ssafy.inmind.management.repository.ManagementRepository;
import com.ssafy.inmind.management.dto.UnavailableTimeDto;
import com.ssafy.inmind.management.entity.UnavailableTime;
import com.ssafy.inmind.management.repository.UnavailableTimeRepository;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagementService {

    private final ManagementRepository managementRepository;
    private final UnavailableTimeRepository unavailableTimeRepository;
    private final UserRepository userRepository;


    public List<UnavailableTimeDto> getUnavailableTime(long coIdx){
        List<UnavailableTime> unavailableTimes = unavailableTimeRepository.findByUserId(coIdx);

        return unavailableTimes.stream()
                .map(unavailableTime -> UnavailableTimeDto.builder()
                        .id(unavailableTime.getId())
                        .date(unavailableTime.getDate())
                        .startTime(unavailableTime.getStartTime())
                        .endTime(unavailableTime.getEndTime())
                        .build())
                .collect(Collectors.toList());
    }

    public void saveDefaultTime(DefaultTimeResponseDto dto) {
        User user = userRepository.findById(dto.getUserIdx())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalTime startTime = dto.getAvailableTimeStartTime();
        LocalTime endTime = dto.getAvailableTimeEndTime();


        DefaultTime defaultTime = DefaultTime.builder()
                .user(user)
                .startTime(startTime)
                .endTime(endTime)
                .build();
        managementRepository.save(defaultTime);
    }

    public void saveUnavailableTime(UnavailableTimeDto dto) {
        User user = userRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalTime startTime = dto.getStartTime();
        LocalTime endTime = dto.getEndTime();
        LocalDate date = dto.getDate();

        for (LocalTime time = startTime; time.isBefore(endTime); time = time.plusHours(1)) {
            List<UnavailableTime> conflictingTimes = unavailableTimeRepository.findConflictingUnavailableTimes(
                    user.getId(), date, time);

            if (conflictingTimes.isEmpty()) {
                UnavailableTime unavailableTime = UnavailableTime.builder()
                        .user(user)
                        .date(date)
                        .startTime(time)
                        .endTime(time.plusHours(1))
                        .build();

                unavailableTimeRepository.save(unavailableTime);
            }
        }
    }

    public void deleteUnavailableTime(Long timeId) {
        unavailableTimeRepository.deleteById(timeId);
    }

}
