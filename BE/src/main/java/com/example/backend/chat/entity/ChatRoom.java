package com.example.backend.chat.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chat_room")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "idx")
    private int id;

//    // foreign key
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user1_idx", nullable = false)
//    private User user1Idx;
//
//    // foreign key
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user2_idx", nullable = false)
//    private User user2Idx;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
