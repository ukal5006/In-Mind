package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorUpdateRequestDto {
//    @Email(message = "유효한 이메일 형식이어야 합니다.")
    private String userEmail;

    @NotBlank(message = "이름은 필수입니다.")
    private String userName;

    @NotBlank(message = "전화번호는 필수입니다.")
    private String userTel;

    private String userProfile;

    @NotBlank(message = "유저 역할은 필수입니다.")
    private RoleStatus userRole;

    private String intro;
}
