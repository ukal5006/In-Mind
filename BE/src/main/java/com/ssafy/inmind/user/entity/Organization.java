package com.ssafy.inmind.user.entity;


import com.ssafy.inmind.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@Table(name = "organization")

public class Organization extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @OneToMany(mappedBy = "organization")
    private List<User> users = new ArrayList<>();

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String addr;

    @Column(nullable = false)
    private String tel;

//    @CreatedDate
//    @Column(name = "created_at", updatable = false, nullable = false)
//    private LocalDateTime createdAt;

}
