package com.ssafy.inmind.user.repository.search;

import com.ssafy.inmind.user.dto.OrgListResponseDto;

import java.util.List;

public interface SearchOrgRepository {
    List<OrgListResponseDto> findOrgByName(String name);

    List<OrgListResponseDto> findAllOrgs();
}
