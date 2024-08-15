package com.ssafy.inmind.reservation.repository;


import com.ssafy.inmind.reservation.entity.Reservation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReserveRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByCounselor_Id(Long counselorId);
    List<Reservation> findAllByUser_Id(Long userId);
//    Reservation findByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Reservation r SET r.isEnd = 'Y' WHERE r.id = :idx")  // 리뷰 등록시 예약정보의 isEnd 값 update
    void updateIsEndToY(Long idx);
}
