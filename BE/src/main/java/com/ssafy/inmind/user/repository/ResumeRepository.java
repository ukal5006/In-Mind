<<<<<<< HEAD:BE/src/main/java/com/ssafy/inmind/user/repository/ResumeRepository.java
package com.ssafy.inmind.user.repository;


import com.ssafy.inmind.user.entity.Resume;
=======
package com.example.backend.user.repository;

import com.example.backend.user.entity.Resume;
>>>>>>> 310205a9454e5847643b2127a74539ea5d895c18:BE/src/main/java/com/example/backend/user/repository/ResumeRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    // Optional을 사용하면 결과가 없을 경우를 더 안전하고 명시적으로 처리 가능.
    Optional<Resume> findByUserId(Long userId);
}
