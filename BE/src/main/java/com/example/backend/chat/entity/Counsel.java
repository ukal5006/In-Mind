package com.example.backend.chat.entity;


import com.example.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "counsel")
public class Counsel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User userIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "co_idx", nullable = false)
    private User coIdx;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;

    @Column(name = "end_time", nullable = false)
    private Timestamp endTime;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
