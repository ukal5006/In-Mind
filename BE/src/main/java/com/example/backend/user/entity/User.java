package com.example.backend.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
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

}
