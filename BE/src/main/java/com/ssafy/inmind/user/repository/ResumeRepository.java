package com.ssafy.inmind.user.repository;


import com.ssafy.inmind.user.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    // Optional을 사용하면 결과가 없을 경우를 더 안전하고 명시적으로 처리 가능.
    Optional<Resume> findByUserId(Long userId);
}
