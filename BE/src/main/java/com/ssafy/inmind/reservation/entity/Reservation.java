package com.ssafy.inmind.reservation.entity;


import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.user.entity.Review;
import com.ssafy.inmind.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name="reserve_info")
public class Reservation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL)
    private Review review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "co_idx", nullable = false)
    private User counselor;

    @Column(name = "date", nullable = false)
    private LocalDate localDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    public Reservation(User user, User counselor, LocalDate localDate, LocalTime startTime, LocalTime endTime) {
        this.user = user;
        this.counselor = counselor;
        this.localDate = localDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}