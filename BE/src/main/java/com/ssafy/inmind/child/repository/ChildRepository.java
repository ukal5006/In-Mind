package com.ssafy.inmind.child.repository;

import com.ssafy.inmind.child.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByUserId(Long userId);

    @Query("SELECT c FROM Child c WHERE c.user.id = :userId")
    List<Child> findChildrenByUserId(long userId);
}
