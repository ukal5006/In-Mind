package com.example.backend.reservation.entity;

import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name="reserve_info")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "co_idx", nullable = false)
    private User counselor;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Reservation(User user, User counselor, Date date, LocalTime startTime, LocalTime endTime) {
        this.user = user;
        this.counselor = counselor;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public static Reservation fromDto(ReserveRequestDto request, User user, User counselor) {
        Date reserveDate = Date.from(request.getReserveInfoDate().atStartOfDay(ZoneId.systemDefault()).toInstant());

        return new Reservation(user, counselor, reserveDate, request.getReserveInfoStartTime(), request.getReserveInfoEndTime());
    }
}