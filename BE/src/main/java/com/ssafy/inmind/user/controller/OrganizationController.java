package com.ssafy.inmind.user.controller;


import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.OrgRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchResponseDto;
import com.ssafy.inmind.user.service.OrganizationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "기관 컨트롤러", description = "기관 CRUD API")
@RequestMapping("/orgs")
public class OrganizationController {

    private final OrganizationService orgService;

    @Operation(summary = "기관 등록", description = "기관 조회시 값이 없으면 기관을 등록합니다.")
    @PostMapping
    public ResponseEntity<Void> addOrganization(@RequestBody OrgRequestDto requestDTO) throws RestApiException {
        orgService.saveOrg(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "기관 조회", description = "주소 또는 이름으로 기관을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<OrgSearchResponseDto>> getOrgList(@Parameter(description = "type: addr(주소)/name(이름), keyword: 키워드") OrgSearchRequestDto requestDto) throws RestApiException {
        List<OrgSearchResponseDto> list = orgService.getOrgList(requestDto);
        return ResponseEntity.ok(list);
    }

}

