package com.example.backend.organization;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.OrgSearchRequestDto;
import com.example.backend.user.dto.OrgSearchResponseDto;
import com.example.backend.user.entity.Organization;
import com.example.backend.user.repository.OrganizationRepository;
import com.example.backend.user.service.OrganizationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrganizationListTest {
    @Mock
    private OrganizationRepository organizationRepository;

    @InjectMocks
    private OrganizationService organizationService;

    private List<Organization> organizationList;

    @BeforeEach
    void setUp() {
        organizationList = new ArrayList<>();

        organizationList.add(Organization.builder()
                .id(1L)
                .name("Organization1")
                .addr("Address1")
                .tel("0631231234")
                .build());

        organizationList.add(Organization.builder()
                .id(2L)
                .name("Organization2")
                .addr("Address2")
                .tel("0631231234")
                .build());
    }

    @Test
    void testGetOrgList_NoTypeOrKeyword() {
        when(organizationRepository.findAll()).thenReturn(organizationList);

        OrgSearchRequestDto requestDto = new OrgSearchRequestDto(null, null);
        List<OrgSearchResponseDto> result = organizationService.getOrgList(requestDto);

        assertEquals(2, result.size());
    }

    @Test
    void testGetOrgList_TypeAddr() {

        when(organizationRepository.findByAddrLike(anyString())).thenReturn(organizationList);

        OrgSearchRequestDto requestDto = new OrgSearchRequestDto("addr", "Address");
        List<OrgSearchResponseDto> result = organizationService.getOrgList(requestDto);

        assertEquals(2, result.size());
    }

    @Test
    void testGetOrgList_TypeName() {
        when(organizationRepository.findByNameLike(anyString())).thenReturn(organizationList);

        OrgSearchRequestDto requestDto = new OrgSearchRequestDto("name", "Organization");
        List<OrgSearchResponseDto> result = organizationService.getOrgList(requestDto);

        assertEquals(2, result.size());
    }

    @Test
    void testGetOrgList_InvalidType() {
        OrgSearchRequestDto requestDto = new OrgSearchRequestDto("invalid", "keyword");

        RestApiException exception = assertThrows(RestApiException.class, () -> {
            organizationService.getOrgList(requestDto);
        });

        assertEquals(ErrorCode.BAD_REQUEST, exception.getErrorCode());
    }
}
