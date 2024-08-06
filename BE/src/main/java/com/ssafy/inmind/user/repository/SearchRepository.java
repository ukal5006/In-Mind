package com.ssafy.inmind.user.repository;

import com.ssafy.inmind.user.dto.CounselorListDto;

import java.util.List;

// 사용자 정의 인터페이스
public interface SearchRepository {
    List<CounselorListDto> findCounselorsByName(String name);
}
