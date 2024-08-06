package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorResponseDto {

    private Long userIdx;

    private String userEmail;

    private String userName;

    private String userTel;

    private String userProfile;

    private String userIsAuth;

    private RoleStatus userRole;

    private String userIsLive;

    public static CounselorResponseDto fromEntity(User user) {
        return CounselorResponseDto.builder()
                .userIdx(user.getId())
                .userEmail(user.getEmail())
                .userName(user.getName())
                .userTel(user.getTel())
                .userProfile(user.getProfile())
                .userIsAuth(user.getIsAuth())
                .userRole(user.getRole())
                .userIsLive(user.getIsAlive())
                .build();
    }
}
