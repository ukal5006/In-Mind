package com.ssafy.inmind.reservation.repository;


import com.ssafy.inmind.management.entity.UnavailableTime;
import com.ssafy.inmind.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReserveRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByCounselor_Id(Long counselorId);
    List<Reservation> findAllByUser_Id(Long userId);
//    Reservation findByUserId(Long userId);
}
