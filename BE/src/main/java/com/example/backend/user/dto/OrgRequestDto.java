package com.example.backend.user.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgRequestDto {

    private String name;

    private String addr;

    private String tel;
}
