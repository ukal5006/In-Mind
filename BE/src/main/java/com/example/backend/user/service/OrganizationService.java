package com.example.backend.user.service;

import com.example.backend.user.dto.OrgRequestDto;
import com.example.backend.user.entity.Organization;
import com.example.backend.user.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository orgRepository;

    public void saveOrg(OrgRequestDto orgRequestDTO) {
        Organization org = toEntity(orgRequestDTO);
        orgRepository.save(org);
    }

    private Organization toEntity(OrgRequestDto orgRequestDTO) {
        return Organization.builder()
                .name(orgRequestDTO.getName())
                .addr(orgRequestDTO.getAddr())
                .tel(orgRequestDTO.getTel())
                .build();
    }

//    private OrgRequestDto fromEntity(Organization organization) {
//        return new OrgRequestDto(organization.getName(), organization.getAddr(), organization.getTel());
//    }

//    public UserDTO getUser(Long id) {
//        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
//        return convertToDTO(user);
//    }
//
//    private User convertToEntity(UserDTO userDTO) {
//        return User.builder()
//                .id(userDTO.getId())
//                .name(userDTO.getName())
//                .email(userDTO.getEmail())
//                .build();
//    }
//
//    private UserDTO convertToDTO(User user) {
//        return new UserDTO(user.getId(), user.getName(), user.getEmail());
//    }
}
