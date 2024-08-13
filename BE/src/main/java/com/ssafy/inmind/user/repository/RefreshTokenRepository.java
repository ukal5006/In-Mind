package com.ssafy.inmind.user.repository;

import com.ssafy.inmind.user.entity.RefreshToken;
import com.ssafy.inmind.user.entity.Resume;
import com.ssafy.inmind.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RefreshTokenRepository  extends JpaRepository<RefreshToken, Long> {

    @Query("SELECT r FROM RefreshToken r WHERE r.user = :user")
    Optional<RefreshToken> findByUser(@Param("user") User user);
}
