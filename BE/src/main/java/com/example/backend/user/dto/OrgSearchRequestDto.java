package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrgSearchRequestDto {

    private String type;

    private String keyword;
}
