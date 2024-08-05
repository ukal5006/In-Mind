package com.ssafy.inmind.user.repository;


import com.ssafy.inmind.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
