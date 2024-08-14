package com.ssafy.inmind.consulting.repository;

import com.ssafy.inmind.consulting.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultingRepository extends JpaRepository<History, Long> {
    List<History> findByReservation_User_Id(Long userId);
}