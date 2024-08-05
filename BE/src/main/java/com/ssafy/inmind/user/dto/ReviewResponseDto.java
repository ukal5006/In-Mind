package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewResponseDto {

    private Long rno;

    private String content;

    private String userName;

    private Long userIdx;

    private float reviewScore;

    private LocalDateTime createdAt;

    public static ReviewResponseDto fromEntity(Review review) {
        return ReviewResponseDto.builder()
                .rno(review.getRno())
                .content(review.getContent())
                .userName(review.getName())
                .userIdx(review.getReservation().getId())
                .reviewScore(review.getScore())
                .createdAt(review.getCreatedAt())
                .build();
    }
}


