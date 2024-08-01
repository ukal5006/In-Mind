package com.example.backend.user.controller;

import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.OrgRequestDto;
import com.example.backend.user.dto.OrgSearchResponseDto;
import com.example.backend.user.entity.Organization;
import com.example.backend.user.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/orgs")
public class OrganizationController {

    private final OrganizationService orgService;

    @PostMapping
    public ResponseEntity<Void> addOrganization(@RequestBody OrgRequestDto requestDTO) throws RestApiException {
        orgService.saveOrg(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<OrgSearchResponseDto>> getOrgList(@RequestParam String type, @RequestParam String keyword) {
        List<OrgSearchResponseDto> list = orgService.getOrgList(type, keyword);
        return ResponseEntity.ok(list);
    }

}
