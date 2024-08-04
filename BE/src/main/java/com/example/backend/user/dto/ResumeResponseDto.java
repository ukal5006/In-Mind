package com.example.backend.user.dto;

import com.example.backend.user.entity.Organization;
import com.example.backend.user.entity.Resume;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResumeResponseDto {
    private long resumeIdx;

    private String info;

    public static ResumeResponseDto fromEntity(Resume resume) {
        return ResumeResponseDto.builder()
                .resumeIdx(resume.getId())
                .info(resume.getInfo())
                .build();
    }
}
