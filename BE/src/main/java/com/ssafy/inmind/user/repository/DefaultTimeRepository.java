package com.ssafy.inmind.user.repository;


import com.ssafy.inmind.management.entity.DefaultTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DefaultTimeRepository extends JpaRepository<DefaultTime, Long> {
    @Query("SELECT d FROM DefaultTime d WHERE d.user.id = :userId")
    List<DefaultTime> findByUserId(@Param("userId") Long userId);
}
