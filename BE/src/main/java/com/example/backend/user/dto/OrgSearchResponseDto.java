package com.example.backend.user.dto;

import com.example.backend.reservation.dto.ReserveResponseDto;
import com.example.backend.reservation.entity.Reservation;
import com.example.backend.user.entity.Organization;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgSearchResponseDto {

    private long id;

    private String name;

    private String addr;

    private String tel;

    public static OrgSearchResponseDto fromEntity(Organization organization) {
        return OrgSearchResponseDto.builder()
                .id(organization.getId())
                .name(organization.getName())
                .addr(organization.getAddr())
                .addr(organization.getTel())
                .build();
    }
}
