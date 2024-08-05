package com.ssafy.inmind.chat.entity;


import com.ssafy.inmind.common.BaseEntity;
import com.ssafy.inmind.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chat_info")
public class ChatInfo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx", nullable = false)
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_idx", nullable = false)
    private User postIdx;

    @Column(name = "content", nullable = false)
    private String content;

}
