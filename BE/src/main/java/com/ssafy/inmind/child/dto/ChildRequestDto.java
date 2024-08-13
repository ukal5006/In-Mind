package com.ssafy.inmind.child.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildRequestDto {

    private Long userIdx;

    private String childName;

    private String childBirth;

}
