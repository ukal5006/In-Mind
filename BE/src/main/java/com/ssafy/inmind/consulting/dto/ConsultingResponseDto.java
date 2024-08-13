package com.ssafy.inmind.consulting.dto;

import com.ssafy.inmind.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConsultingResponseDto {

    private Long id;
    private Reservation reservation;
}
