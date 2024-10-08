package com.ssafy.inmind;

import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.child.repository.ChildRepository;
import com.ssafy.inmind.reservation.dto.ReserveRequestDto;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.reservation.repository.ReserveRepository;
import com.ssafy.inmind.reservation.service.ReserveService;
import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import com.ssafy.inmind.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class ReserveTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReserveService reserveService;

    @Autowired
    private ReserveRepository reserveRepository;

    @Autowired
    private ChildRepository childRepository;

    private User user;
    private User counselor;
    private Child child;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .email("testuser1@naver.com")
                .password("1234")
                .tel("01012345678")
                .name("홍유저")
                .profile("")
                .role(RoleStatus.USER)
                .isAuth("N")
                .isAlive("Y")
                .build();

        counselor = User.builder()
                .id(2L)
                .email("testuser2@naver.com")
                .password("1234")
                .tel("01091252521")
                .name("홍상담")
                .role(RoleStatus.COUNSELOR)
                .profile("")
                .isAuth("N")
                .isAlive("Y")
                .build();


        userRepository.save(user);
        userRepository.save(counselor);

        Optional<User> savedUser = userRepository.findById(user.getId());
        assertTrue(savedUser.isPresent(), "User should be present in the database");
    }

    // @Test
    // @DisplayName("사용자가 상담사와 예약 상담을 성공합니다.")
    // void reserve() {

    //     String startTime = LocalTime.now().toString();
    //     String endTime = LocalTime.now().plusHours(1).toString();


    //     ReserveRequestDto reserveDto = ReserveRequestDto.builder()
    //             .userIdx(user.getId())
    //             .coIdx(counselor.getId())
    //             .childIdx(2L)
    //             .reserveInfoDate(LocalDate.now())
    //             .reserveInfoStartTime(startTime)
    //             .reserveInfoEndTime(endTime)
    //             .build();

    //     reserveService.reserve(reserveDto);
    //     List<Reservation> reservation = reserveRepository.findAllByCounselor_Id(counselor.getId());

    //     assertThat(reservation).isNotEmpty();

    // }
}

