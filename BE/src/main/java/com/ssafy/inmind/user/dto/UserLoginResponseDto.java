package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLoginResponseDto {
    private String token;

    private UserResponseDto userResponseDto;

    public static UserLoginResponseDto fromEntity(String token, UserResponseDto userResponseDto) {
        return UserLoginResponseDto.builder()
                .token(token)
                .userResponseDto(userResponseDto)
                .build();
    }

}
