package com.example.backend.report.entity;

import com.example.backend.child.entity.Child;
import jakarta.persistence.*;
import jakarta.persistence.criteria.Fetch;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_idx", nullable = false)
    private Child childIdx;

    @Column(name = "result", nullable = false)
    private String result;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "background", nullable = false)
    private String background;

    @Column(name = "drawing_flow", nullable = false)
    private String drawingFlow;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
