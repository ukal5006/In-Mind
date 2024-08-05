<<<<<<< HEAD:BE/src/main/java/com/ssafy/inmind/user/dto/ResumeResponseDto.java
package com.ssafy.inmind.user.dto;


import com.ssafy.inmind.user.entity.Resume;
=======
package com.example.backend.user.dto;

import com.example.backend.user.entity.Organization;
import com.example.backend.user.entity.Resume;
>>>>>>> 310205a9454e5847643b2127a74539ea5d895c18:BE/src/main/java/com/example/backend/user/dto/ResumeResponseDto.java
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
