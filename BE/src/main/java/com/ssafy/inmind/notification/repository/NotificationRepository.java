package com.ssafy.inmind.notification.repository;


import com.ssafy.inmind.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n FROM Notification n WHERE n.scheduledDate = :date AND n.scheduledTime = :time")
    List<Notification> findByScheduledDateAndScheduledTime(
            @Param("date") LocalDate date,
            @Param("time") String time);

    List<Notification> findByUserIdAndIsRead(Long userId, String isRead);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = 'Y' WHERE n.id IN :notificationIds")
    void markAsRead(List<Long> notificationIds);
}
