package com.example.backend.user.entity;

import com.example.backend.chat.entity.ChatRoom;
import com.example.backend.chat.entity.Counsel;
import com.example.backend.child.entity.Child;
import com.example.backend.notification.entity.Notification;
import com.example.backend.reservation.entity.Reservation;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@Table(name = "user")
@Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;
    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_idx", nullable = false)
    private Organization organization;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Certificate> certificates = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Resume> resumes =  new ArrayList<>();

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

    private String nickname;

    @Column(nullable = false)
    private String tel;

    private String profile;

    @Column(name = "is_auth")
    private boolean isAuth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleStatus role;

    @Column(name = "is_alive", nullable = false)
    @ColumnDefault("true")
    private boolean isAlive;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private User(long id, Organization organization, List<Certificate> certificates, List<Resume> resumes,
                 RefreshToken refreshToken, DefaultTime defaultTime, List<UnavailableTime> unavailableTimes,
                 List<ChatRoom> chatRooms, List<Like> like, List<Notification> notifications,
                 List<Child> children, List<Reservation> reservations, List<Counsel> counsels,
                 String email, String password, String name, String nickname, String tel, String profile,
                 boolean isAuth, RoleStatus role, boolean isAlive, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.organization = organization;
        this.certificates = certificates;
        this.resumes = resumes;
        this.refreshToken = refreshToken;
        this.defaultTime = defaultTime;
        this.unavailableTimes = unavailableTimes;
        this.chatRooms = chatRooms;
        this.likes = like;
        this.notifications = notifications;
        this.children = children;
        this.reservations = reservations;
        this.counsels = counsels;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.tel = tel;
        this.profile = profile;
        this.isAuth = isAuth;
        this.role = role;
        this.isAlive = isAlive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
