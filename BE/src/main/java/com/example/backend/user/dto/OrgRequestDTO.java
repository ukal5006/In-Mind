package com.example.backend.user.dto;

import com.example.backend.user.entity.Organization;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrgRequestDTO {

    private String name;
    private String addr;
    private String tel;

    @Builder
    public OrgRequestDTO(String name, String addr, String tel) {
        this.name = name;
        this.addr = addr;
        this.tel = tel;
    }

    public Organization toEntity() {
        return Organization.builder()
                .name(name)
                .addr(addr)
                .tel(tel)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
