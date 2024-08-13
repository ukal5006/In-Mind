package com.ssafy.inmind.user.service;


import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.OrgListResponseDto;
import com.ssafy.inmind.user.dto.OrgRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchResponseDto;
import com.ssafy.inmind.user.entity.Organization;
import com.ssafy.inmind.user.repository.OrganizationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrganizationService {

    private final OrganizationRepository orgRepository;

    @Transactional
    public void saveOrg(OrgRequestDto requestDto) {

        Organization org = Organization.builder()
                .name(requestDto.getName())
                .addr(requestDto.getAddr())
                .tel(requestDto.getTel())
                .build();

        orgRepository.save(org);
    }

    public List<OrgSearchResponseDto> getOrgList(OrgSearchRequestDto requestDto) {
        String type = requestDto.getType();
        String keyword = requestDto.getKeyword();

        List<Organization> result;

        if (type == null || keyword == null || type.isEmpty() || keyword.isEmpty()) {
            result = orgRepository.findAll();
        }
        else if (type.equals("addr")) {
            result = orgRepository.findByAddrLike(keyword);
        } else if (type.equals("name")) {
            result = orgRepository.findByNameLike(keyword);
        } else {
            throw new RestApiException(ErrorCode.BAD_REQUEST);
        }

        return result.stream()
                .map(OrgSearchResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<OrgListResponseDto> getOrgListByName(String name) {
        return orgRepository.findOrgByName(name);
    }

    public List<OrgListResponseDto> getOrgListAll() {
        return orgRepository.findAllOrgs();
    }
}
