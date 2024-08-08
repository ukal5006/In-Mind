package com.ssafy.inmind.reservation.service;


import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.child.repository.ChildRepository;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.notification.dto.NotificationDto;
import com.ssafy.inmind.notification.entity.Notification;
import com.ssafy.inmind.notification.entity.NotificationType;
import com.ssafy.inmind.notification.repository.NotificationRepository;
import com.ssafy.inmind.notification.service.SseEmitterService;
import com.ssafy.inmind.reservation.dto.ReserveRequestDto;
import com.ssafy.inmind.reservation.dto.ReserveResponseDto;
import com.ssafy.inmind.reservation.dto.ReserveUpdateDto;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.management.entity.UnavailableTime;
import com.ssafy.inmind.reservation.repository.ReserveRepository;
import com.ssafy.inmind.management.repository.UnavailableTimeRepository;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
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
    private final SseEmitterService sseEmitterService;
    private final ChildRepository childRepository;

    // 상담 예약 추가
    @Transactional
    public void reserve(ReserveRequestDto request) {
        User user = userRepository.findById(request.getUserIdx())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User counselor = userRepository.findById(request.getCoIdx())
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
                .child(request.getChildIdx())
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
        sendNotification(counselor.getId());
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
                .alertTime(reminderTimeString)
                .scheduledDate(reservationDate)
                .scheduledTime(startTimeString)
                .isRead("N")
                .build();

        Notification startNotification = Notification.builder()
                .user(user)
                .message("상담이 시작되었습니다.")
                .type(NotificationType.RESERVATION_START)
                .alertTime(startTimeString)
                .scheduledDate(reservationDate)
                .scheduledTime(startTimeString)
                .isRead("N")
                .build();

        Notification reserveNotification = Notification.builder()
                .user(counselor)
                .message("예약이 접수되었습니다.")
                .type(NotificationType.RESERVATION_CONFIRMED)
                .alertTime(startTimeString)
                .scheduledDate(reservationDate)
                .scheduledTime(startTimeString)
                .isRead("N")
                .build();


        notificationRepository.save(reminderNotification);
        notificationRepository.save(startNotification);
        notificationRepository.save(reserveNotification);
    }

    // 예약 접수 알림
    private void sendNotification(Long counselorId) {
        String message = "예약이 접수되었습니다.";
        String emitterId = sseEmitterService.makeTimeIncludeId(counselorId);
        NotificationDto notificationDto = NotificationDto.builder()
                .message(message)
                .build();
        sseEmitterService.sendNotification(emitterId, notificationDto);
    }

}
