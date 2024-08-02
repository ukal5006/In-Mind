package com.example.backend.reservation.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.notification.entity.Notification;
import com.example.backend.notification.entity.NotificationType;
import com.example.backend.notification.repository.NotificationRepository;
import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.dto.ReserveResponseDto;
import com.example.backend.reservation.dto.ReserveUpdateDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.reservation.repository.ReserveRepository;
import com.example.backend.reservation.entity.UnavailableTime;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.DefaultTimeRepository;
import com.example.backend.reservation.repository.UnavailableTimeRepository;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReserveService {

    private final ReserveRepository reserveRepository;
    private final UserRepository userRepository;
    private final UnavailableTimeRepository unavailableTimeRepository;
    private final NotificationRepository notificationRepository;

    // 상담 예약 추가
    @Transactional
    public void reserve(ReserveRequestDto request) {
        User user = userRepository.findById((int) request.getUserIdx())
                .orElseThrow(() -> new RuntimeException("User not ,found"));

        User counselor = userRepository.findById((int) request.getCoIdx())
                .orElseThrow(() -> new RuntimeException("Counselor not found"));

        LocalDate reservationDate = request.getReserveInfoDate();
        LocalTime startTime = request.getReserveInfoStartTime();
        LocalTime endTime = request.getReserveInfoEndTime();

        // 불가능 시간 체크
        List<UnavailableTime> conflictingUnavailableTimes = unavailableTimeRepository.findConflictingUnavailableTimes(
                counselor.getId(),
                reservationDate,
                startTime
        );

        if (!conflictingUnavailableTimes.isEmpty()) {
            throw new RestApiException(ErrorCode.BAD_REQUEST);
        }

        // 예약 정보 저장
        Reservation reservation = Reservation.builder()
                .user(user)
                .counselor(counselor)
                .localDate(reservationDate)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        reserveRepository.save(reservation);

        // 불가능한 시간 정보 저장
        UnavailableTime unavailableTime = UnavailableTime.builder()
                .user(counselor)
                .date(request.getReserveInfoDate())
                .startTime(request.getReserveInfoStartTime())
                .endTime(request.getReserveInfoEndTime())
                .build();

        unavailableTimeRepository.save(unavailableTime);

        createAndSaveNotifications(user, counselor, reservationDate, startTime);
    }

    // 상담 예약 정보 조회
    public List<ReserveResponseDto> getReservation(long userId) {
        List<Reservation> reservations = reserveRepository.findByUserId(userId);

        return reservations.stream()
                .map(ReserveResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateReserve(ReserveUpdateDto request) {
        Reservation reservation = reserveRepository.findById(request.getReserveInfoIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.BAD_REQUEST));

        Reservation updatedReservation = Reservation.builder()
                .id(reservation.getId())
                .user(reservation.getUser())
                .counselor(reservation.getCounselor())
                .localDate(request.getReserveInfoDate())
                .startTime(request.getReserveInfoStartTime())
                .endTime(request.getReserveInfoEndTime())
                .build();

        reserveRepository.save(updatedReservation);
    }

    @Transactional
    public void deleteReserve(long reserveId) {
        try {
            reserveRepository.deleteById(reserveId);
        } catch (EmptyResultDataAccessException e) {
            throw new RestApiException(ErrorCode.BAD_REQUEST);
        }
    }

    // 알림 생성 및 저장 메서드
    private void createAndSaveNotifications(User user, User counselor, LocalDate reservationDate, LocalTime startTime) {
        String startTimeString = startTime.toString();
        String reminderTimeString = startTime.minusMinutes(30).toString();

        Notification reminderNotification = Notification.builder()
                .user(user)
                .message("상담 30분 전입니다.")
                .type(NotificationType.RESERVATION_REMINDER)
                .scheduledDate(reservationDate)
                .scheduledTime(startTimeString)
                .build();

        Notification startNotification = Notification.builder()
                .user(user)
                .message("상담이 시작되었습니다.")
                .type(NotificationType.RESERVATION_START)
                .scheduledDate(reservationDate)
                .scheduledTime(reminderTimeString)
                .build();

        Notification reserveNotification = Notification.builder()
                .user(counselor)
                .message("예약이 접수되었습니다.")
                .type(NotificationType.RESERVATION_CONFIRMED)
                .scheduledDate(reservationDate)
                .scheduledTime(startTimeString)
                .build();


        notificationRepository.save(reminderNotification);
        notificationRepository.save(startNotification);
        notificationRepository.save(reserveNotification);
    }

}
