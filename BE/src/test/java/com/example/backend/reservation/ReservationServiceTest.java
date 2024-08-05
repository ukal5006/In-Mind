package com.example.backend.reservation;


import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.reservation.repository.ReserveRepository;
import com.example.backend.reservation.service.ReserveService;
import com.example.backend.user.entity.RoleStatus;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.DefaultTimeRepository;
import com.example.backend.reservation.repository.UnavailableTimeRepository;
import com.example.backend.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class ReservationServiceTest {

    @InjectMocks
    private ReserveService reserveService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReserveRepository reserveRepository;

    @Mock
    private DefaultTimeRepository defaultTimeRepository;

    @Mock
    private UnavailableTimeRepository unavailableTimeRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @DisplayName("사용자, 상담사의 id를 받아 예약을 생성합니다.")
    @Test
    public void createReservation() {
        // given
        User user = User.builder()
                .id(1)
                .email("test@example.com")
                .password("password123")
                .name("Test User")
                .tel("123-456-7890")
                .isAuth(false)
                .role(RoleStatus.USER)
                .build();

        User counselor = User.builder()
                .id(2)
                .email("counselor@example.com")
                .password("password456")
                .name("Counselor Name")
                .tel("098-765-4321")
                .isAuth(true)
                .role(RoleStatus.COUNSELOR)
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.findById(2L)).thenReturn(Optional.of(counselor));

        ReserveRequestDto request = ReserveRequestDto.builder()
                .userIdx(1L)
                .coIdx(2L)
                .reserveInfoDate(LocalDate.now())
                .reserveInfoStartTime(LocalTime.of(10, 0))
                .reserveInfoEndTime(LocalTime.of(11, 0))
                .build();

        Reservation savedReservation = new Reservation(user, counselor,
                request.getReserveInfoDate(), // LocalDate
                request.getReserveInfoStartTime(), // LocalTime
                request.getReserveInfoEndTime()); // LocalTime


        when(reserveRepository.save(any(Reservation.class))).thenReturn(savedReservation);

    }

}
