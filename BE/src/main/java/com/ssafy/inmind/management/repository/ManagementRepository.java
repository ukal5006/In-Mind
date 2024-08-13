package com.ssafy.inmind.management.repository;

import com.ssafy.inmind.management.entity.DefaultTime;
import com.ssafy.inmind.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagementRepository extends JpaRepository<DefaultTime, Long> {
    Optional<DefaultTime> findByUser(User user);
    void deleteByUser(User user);
}
