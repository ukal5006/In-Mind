package com.ssafy.inmind.report.entity;

import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_idx", nullable = false)
    private Child child;

    @Column(name = "object_result", columnDefinition = "TEXT", nullable = false)
    private String objectResult;

    @Column(name = "result", columnDefinition = "TEXT", nullable = false)
    private String result;

    @Column(name = "img_h" ,columnDefinition = "TEXT")
    private String houseImage;

    @Column(name = "img_t", columnDefinition = "TEXT")
    private String treeImage;

    @Column(name = "img_p" , columnDefinition = "TEXT")
    private String personImage;

    @Column(name = "background",columnDefinition = "TEXT", nullable = false)
    private String background;

    @Column(name = "drawing_flow",columnDefinition = "TEXT", nullable = false)
    private String drawingFlow;

}
