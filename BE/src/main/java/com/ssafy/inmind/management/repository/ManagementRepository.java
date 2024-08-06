package com.ssafy.inmind.management.repository;

import com.ssafy.inmind.management.entity.DefaultTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagementRepository extends JpaRepository<DefaultTime, Long> {
}
