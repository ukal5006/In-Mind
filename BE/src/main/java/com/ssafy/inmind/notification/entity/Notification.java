package com.ssafy.inmind.notification.entity;

<<<<<<< HEAD:BE/src/main/java/com/ssafy/inmind/notification/entity/Notification.java

import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.user.entity.User;
=======
import com.example.backend.common.BaseEntity;
import com.example.backend.user.entity.User;
>>>>>>> 310205a9454e5847643b2127a74539ea5d895c18:BE/src/main/java/com/example/backend/notification/entity/Notification.java
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Entity
@Table(name="notification")
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @Column(nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    private boolean isRead = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType type;

    @Column(name = "scheduled_date", nullable = false)
    private LocalDate scheduledDate;

    @Column(name = "scheduled_time", nullable = false)
    private String scheduledTime;
}
