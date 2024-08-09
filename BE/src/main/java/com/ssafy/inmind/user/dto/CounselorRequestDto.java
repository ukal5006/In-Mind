package com.ssafy.inmind.user.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorRequestDto {

    private Long orgIdx;
    private String email;
    private String password;
    private String name;
    private String tel;
    private String role;
}
