package com.ssafy.inmind.child.repository;

import com.ssafy.inmind.child.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByUserId(Long userId);
}
