package com.ssafy.inmind.user.repository;


import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.search.SearchCounselorRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> , SearchCounselorRepository {

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password AND u.isAlive = 'Y'")
    Optional<User> findByUserEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.isAlive = 'Y'")
    Optional<User> findByUserEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isAlive = 'Y'")
    Optional<User> findByUserId(@Param("id") Long id);

}
