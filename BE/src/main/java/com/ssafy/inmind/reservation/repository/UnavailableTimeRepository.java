package com.ssafy.inmind.reservation.repository;


import com.ssafy.inmind.reservation.entity.UnavailableTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface UnavailableTimeRepository extends JpaRepository<UnavailableTime, Long> {
    @Query("SELECT u FROM UnavailableTime u WHERE u.user.id = :counselorId " +
            "AND u.date = :date " +
            "AND (u.startTime = :startTime)")
    List<UnavailableTime> findConflictingUnavailableTimes(@Param("counselorId") Long counselorId,
                                                          @Param("date") LocalDate date,
                                                          @Param("startTime") LocalTime startTime);

    List<UnavailableTime> findByUserId(long coIdx);
}
