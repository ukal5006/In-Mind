package com.ssafy.inmind.child.entity;

import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.report.entity.Report;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="child_info")
public class Child extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    @Column(nullable = false)
    private String name;

    @Column(name = "birthday", nullable = false)
    private String birthday;
}
