package com.ssafy.inmind.reservation.repository;


import com.ssafy.inmind.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReserveRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCounselor_Id(Long counselorId);
    Reservation findByUserId(Long userId);
}
