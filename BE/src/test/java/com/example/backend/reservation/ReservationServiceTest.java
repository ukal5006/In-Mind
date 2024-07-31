package com.example.backend.reservation;


import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.reservation.repository.ReserveRepository;
import com.example.backend.reservation.service.ReserveService;
import com.example.backend.user.entity.RoleStatus;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
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
                .nickname("Tester")
                .tel("123-456-7890")
                .isAuth(false)
                .role(RoleStatus.USER)
                .build();

        User counselor = User.builder()
                .id(2)
                .email("counselor@example.com")
                .password("password456")
                .name("Counselor Name")
                .nickname("Counselor")
                .tel("098-765-4321")
                .isAuth(true)
                .role(RoleStatus.COUNSELOR)
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.findById(2)).thenReturn(Optional.of(counselor));

        ReserveRequestDto request = new ReserveRequestDto();
        request.setUserIdx(1);
        request.setCoIdx(2);
        request.setReserveInfoDate(LocalDate.now()); // LocalDate로 설정
        request.setReserveInfoStartTime(LocalTime.of(10, 0)); // LocalTime으로 설정
        request.setReserveInfoEndTime(LocalTime.of(11, 0)); // LocalTime으로 설정

        // Reservation 생성 시 LocalDate와 LocalTime을 사용
        Reservation savedReservation = new Reservation(user, counselor,
                Date.from(request.getReserveInfoDate().atStartOfDay(ZoneId.systemDefault()).toInstant()),
                request.getReserveInfoStartTime(),
                request.getReserveInfoEndTime());

        when(reserveRepository.save(any(Reservation.class))).thenReturn(savedReservation);

        // when
        Reservation reservation = reserveService.reserve(request);

        // then
        assertNotNull(reservation);
        assertEquals(user.getId(), reservation.getUser().getId());
        assertEquals(counselor.getId(), reservation.getCounselor().getId());
        assertEquals(Date.from(request.getReserveInfoDate().atStartOfDay(ZoneId.systemDefault()).toInstant()), reservation.getDate());
        assertEquals(request.getReserveInfoStartTime(), reservation.getStartTime());
        assertEquals(request.getReserveInfoEndTime(), reservation.getEndTime());
    }
}
