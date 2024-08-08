package com.ssafy.inmind.user.repository.search;

import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.dto.CounselorResponseDto;

import java.util.List;

// 사용자 정의 인터페이스
public interface SearchCounselorRepository {
    List<CounselorListDto> findCounselorsByName(String name);

    List<CounselorListDto> findAllCounselors();

    CounselorResponseDto findCounselorById(Long id);
}
