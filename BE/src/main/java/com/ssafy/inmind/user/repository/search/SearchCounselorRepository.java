package com.ssafy.inmind.user.repository.search;

import com.ssafy.inmind.user.dto.CounselorListDto;

import java.util.List;

// 사용자 정의 인터페이스
public interface SearchCounselorRepository {
    List<CounselorListDto> findCounselorsByName(String name);
}
