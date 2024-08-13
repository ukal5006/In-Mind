package com.ssafy.inmind.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorResponseDto {

    private Long userIdx;

    private String name;

    private String tel;

    private String profile;

    private String isAuth;

    private String intro;

    private String organizationName;

    private String organizationTel;

    private String resumeInfo;

    private Long reviewCount;

    private Double reviewAverage;

    @QueryProjection
    public CounselorResponseDto(Long userIdx, String name, String tel, String profile, String isAuth, String intro, String organizationName, String organizationTel, String resumeInfo, Long reviewCount, Double  reviewAverage) {
        this.userIdx = userIdx;
        this.name = name;
        this.tel = tel;
        this.profile = profile;
        this.isAuth = isAuth;
        this.intro = intro;
        this.organizationName = organizationName;
        this.organizationTel = organizationTel;
        this.resumeInfo = resumeInfo;
        this.reviewCount = reviewCount;
        this.reviewAverage = reviewAverage;
    }
}
