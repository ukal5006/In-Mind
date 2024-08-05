package com.ssafy.inmind.user.repository;

import com.ssafy.inmind.user.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.coIdx = :coIdx")
    List<Review> findAllByCoIdx(@Param("coIdx") Long coIdx);

}
