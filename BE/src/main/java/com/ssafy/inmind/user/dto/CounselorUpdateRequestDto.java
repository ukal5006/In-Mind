package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorUpdateRequestDto {
    private Long userIdx;

    private String userEmail;

    private String userPassword;

    private String userName;

    private String userTel;

    private String userProfile;

    private String userIsAuth;

    private RoleStatus userRole;

    private String userIsLive;

    public static CounselorUpdateRequestDto fromEntity(User user) {
        return CounselorUpdateRequestDto.builder()
                .userIdx(user.getId())
                .userEmail(user.getEmail())
                .userName(user.getPassword())
                .userName(user.getName())
                .userTel(user.getTel())
                .userIsAuth(user.getIsAuth())
                .userProfile(user.getProfile())
                .userRole(user.getRole())
                .userIsLive(user.getIsAlive())
                .build();
    }
}
