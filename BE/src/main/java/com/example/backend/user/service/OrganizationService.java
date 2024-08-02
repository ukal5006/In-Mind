package com.example.backend.user.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.OrgRequestDto;
import com.example.backend.user.dto.OrgSearchRequestDto;
import com.example.backend.user.dto.OrgSearchResponseDto;
import com.example.backend.user.entity.Organization;
import com.example.backend.user.repository.OrganizationRepository;
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
}
