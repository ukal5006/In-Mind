package com.example.backend.user.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.ResumeRequestDto;
import com.example.backend.user.entity.Resume;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.ResumeRepository;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public void saveResume(ResumeRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.INTERNAL_SERVER_ERROR));

        Resume resume = Resume.builder()
                .user(user)
                .info(requestDto.getInfo())
                .build();

        resumeRepository.save(resume);
    }
}
