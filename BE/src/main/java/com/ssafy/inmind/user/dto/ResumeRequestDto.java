<<<<<<< HEAD:BE/src/main/java/com/ssafy/inmind/user/dto/ResumeRequestDto.java
package com.ssafy.inmind.user.dto;
=======
package com.example.backend.user.dto;
>>>>>>> 310205a9454e5847643b2127a74539ea5d895c18:BE/src/main/java/com/example/backend/user/dto/ResumeRequestDto.java

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResumeRequestDto {

    private long userIdx;

    private String info;
}
