package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserResponseDto {

    private Long userIdx;

    private String userEmail;

    private String userName;

    private String userTel;

    private String userProfile;

    private RoleStatus userRole;

    private String userIsAuth;

    private String userIntro;

    public static UserResponseDto fromEntity(User user) {
        return UserResponseDto.builder()
                .userIdx(user.getId())
                .userEmail(user.getEmail())
                .userName(user.getName())
                .userTel(user.getTel())
                .userProfile(user.getProfile())
                .userRole(user.getRole())
                .userIsAuth(user.getIsAuth())
                .userIntro(user.getIntro())
                .build();
    }
}
