package com.ssafy.inmind.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgListResponseDto {

    private String organizationName;

    private String organizationAddr;

    private String organizationTel;

    private int counselorCnt;

    @QueryProjection
    public OrgListResponseDto(String organizationName, String organizationAddr, String organizationTel, int counselorCnt) {
        this.organizationName = organizationName;
        this.organizationAddr = organizationAddr;
        this.organizationTel = organizationTel;
        this.counselorCnt = counselorCnt;
    }
}
