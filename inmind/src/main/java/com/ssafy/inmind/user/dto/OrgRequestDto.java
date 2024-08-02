package com.ssafy.inmind.user.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgRequestDto {

    private String name;

    private String addr;

    private String tel;
}
