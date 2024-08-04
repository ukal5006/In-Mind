package com.ssafy.inmind.user.controller;


import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.OrgRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchRequestDto;
import com.ssafy.inmind.user.dto.OrgSearchResponseDto;
import com.ssafy.inmind.user.service.OrganizationService;
import io.swagger.v3.oas.annotations.Operation;
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
@Tag(name = "소속 기관", description = "Swagger 테스트")
@RequestMapping("/orgs")
public class OrganizationController {

    private final OrganizationService orgService;

    @Operation(summary = "소속 기관 입력", description = "소속한 기관을 등록합니다.")
    @PostMapping
    public ResponseEntity<Void> addOrganization(@RequestBody OrgRequestDto requestDTO) throws RestApiException {
        orgService.saveOrg(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<OrgSearchResponseDto>> getOrgList(OrgSearchRequestDto requestDto) throws RestApiException {
        List<OrgSearchResponseDto> list = orgService.getOrgList(requestDto);
        return ResponseEntity.ok(list);
    }

}
