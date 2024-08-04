package com.ssafy.inmind.user.dto;

import com.ssafy.inmind.user.entity.Organization;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgSearchResponseDto {

    private long idx;

    private String name;

    private String addr;

    private String tel;

    public static OrgSearchResponseDto fromEntity(Organization organization) {
        return OrgSearchResponseDto.builder()
                .idx(organization.getId())
                .name(organization.getName())
                .addr(organization.getAddr())
                .tel(organization.getTel())
                .build();
    }
}
