package com.example.backend.user.controller;

import com.example.backend.user.dto.OrgRequestDTO;
import com.example.backend.user.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/orgs")
public class OrganizationController {

    private final OrganizationService orgService;

    @PostMapping
    public ResponseEntity<?> addOrganization(@RequestBody OrgRequestDTO requestDTO) {
        log.info(requestDTO.toString());
        orgService.saveOrg(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
