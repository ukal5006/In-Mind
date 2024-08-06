package com.ssafy.inmind.user.entity;

import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.reservation.entity.Reservation;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "review")
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rno")
    private Long rno;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserve_idx", nullable = false)
    private Reservation reservation;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "co_idx", nullable = false)
    private Long coIdx;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "score", nullable = false)
    private int score;
}
