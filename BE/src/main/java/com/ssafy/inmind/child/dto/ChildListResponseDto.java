package com.ssafy.inmind.child.dto;
import com.ssafy.inmind.child.entity.Child;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildListResponseDto {

    private Long childIdx;

    private String childName;

    private String childBirth;

    public static ChildListResponseDto fromEntity(Child child) {
        return ChildListResponseDto.builder()
                .childIdx(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirthday())
                .build();
    }
}
