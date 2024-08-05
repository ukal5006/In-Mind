package com.ssafy.inmind.child.dto;

import com.ssafy.inmind.child.entity.Child;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildResponseDto {

    private String childName;

    private String childBirth;

    public static ChildResponseDto fromEntity(Child child) {
        return ChildResponseDto.builder()
                .childName(child.getName())
                .childBirth(child.getBirthday())
                .build();
    }
}
