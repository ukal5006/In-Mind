package com.example.backend.user.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.OrgRequestDto;
import com.example.backend.user.dto.OrgSearchRequestDto;
import com.example.backend.user.dto.OrgSearchResponseDto;
import com.example.backend.user.entity.Organization;
import com.example.backend.user.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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

    public List<OrgSearchResponseDto> getOrgList(String type, String keyword) {
        List<Organization> result = new ArrayList<>();

        if ("addr".equals(type)) {
            result = orgRepository.findByAddrContaining(keyword);
        } else if ("name".equals(type)) {
            result = orgRepository.findByName(keyword);
        } else {
            throw new RestApiException(ErrorCode.BAD_REQUEST);
        }
        System.out.println(result);
        return result.stream()
                .map(OrgSearchResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
