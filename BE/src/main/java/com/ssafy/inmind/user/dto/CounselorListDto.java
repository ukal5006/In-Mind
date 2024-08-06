package com.ssafy.inmind.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class CounselorListDto {
    private Long userIdx;

    private String name;

    private String tel;

    private String profile;

    private String isAuth;

    private String organizationName;

    private String organizationTel;

    private String certificateTitle;

    private String resumeInfo;

    private Long reviewCount;

    private Double reviewAverage;

    @QueryProjection
    public CounselorListDto(Long userIdx, String name, String tel, String profile, String isAuth, String organizationName, String organizationTel, String certificateTitle, String resumeInfo, Long reviewCount, Double  reviewAverage) {
        this.userIdx = userIdx;
        this.name = name;
        this.tel = tel;
        this.profile = profile;
        this.isAuth = isAuth;
        this.organizationName = organizationName;
        this.organizationTel = organizationTel;
        this.certificateTitle = certificateTitle;
        this.resumeInfo = resumeInfo;
        this.reviewCount = reviewCount;
        this.reviewAverage = reviewAverage;
    }
}
