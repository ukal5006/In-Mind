package com.ssafy.inmind.user.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewRequestDto {

    private Long reserveIdx;

    private String name;

    private Long coIdx;

    private String content;

    private int score;

}
