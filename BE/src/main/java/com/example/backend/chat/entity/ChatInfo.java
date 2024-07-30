package com.example.backend.chat.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chat_info")
public class ChatInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "room_idx", nullable = false)
    private ChatRoom chatRoom;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @Column(name = "post_idx", nullable = false)
//    private User postIdx;

    @Column(name = "content", nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
