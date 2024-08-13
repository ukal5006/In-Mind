package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUpdateRequestDto {

    @NotBlank(message = "사용자 이름은 필수입니다.")
    private String userName;

    @NotBlank(message = "전화번호는 필수입니다.")
    private String userTel;

    @Size(max = 500, message = "프로필은 500자 이하여야 합니다.")
    private String userProfile;

    @NotNull(message = "사용자 역할은 필수입니다.")
    private RoleStatus userRole;
}
