package com.ssafy.inmind.user.entity;


import com.ssafy.inmind.chat.entity.ChatRoom;
import com.ssafy.inmind.chat.entity.Counsel;
import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.management.entity.DefaultTime;
import com.ssafy.inmind.notification.entity.Notification;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.management.entity.UnavailableTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;
    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_idx")
    private Organization organization;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Certificate> certificates = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Resume resume;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private RefreshToken refreshToken;

    @OneToOne(mappedBy = "user",fetch = FetchType.LAZY)
    private DefaultTime defaultTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UnavailableTime> unavailableTimes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ChatRoom> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Child> children = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Counsel> counsels = new ArrayList<>();

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String tel;

    private String profile;

    @Column(name = "is_auth")
    private Boolean isAuth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleStatus role;

    @Column(name = "is_alive", nullable = false)
    @ColumnDefault("true")
    private boolean isAlive;
}
