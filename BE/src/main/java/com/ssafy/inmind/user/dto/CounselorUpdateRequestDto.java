package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorUpdateRequestDto {
    private String userEmail;

    private String userName;

    private String userTel;

    private String userProfile;

    private RoleStatus userRole;

    private String intro;
}
