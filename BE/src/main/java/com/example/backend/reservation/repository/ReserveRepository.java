package com.example.backend.reservation.repository;

import com.example.backend.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReserveRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(long userId);
}
