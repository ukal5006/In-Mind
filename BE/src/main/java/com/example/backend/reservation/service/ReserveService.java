package com.example.backend.reservation.service;

import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.reservation.repository.ReserveRepository;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReserveService {

    private final ReserveRepository reserveRepository;
    private final UserRepository userRepository;

    @Transactional
    public Reservation reserve(ReserveRequestDto request) {
        User user = userRepository.findById((int) request.getUserIdx())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User counselor = userRepository.findById((int) request.getCoIdx())
                .orElseThrow(() -> new RuntimeException("Counselor not found"));

        Reservation reservation = Reservation.fromDto(request, user, counselor);
        return reserveRepository.save(reservation);
    }
}
