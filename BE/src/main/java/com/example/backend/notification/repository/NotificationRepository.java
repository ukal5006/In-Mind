package com.example.backend.notification.repository;

import com.example.backend.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByScheduledTime(String scheduledTime);
    List<Notification> findByScheduledDate(LocalDate scheduledDate);
}
