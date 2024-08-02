package com.example.backend.child.entity;

import com.example.backend.common.BaseEntity;
import com.example.backend.report.entity.Report;
import com.example.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false)
    private String name;

    @Column(name = "birthday", nullable = false)
    private String birthday;
}
