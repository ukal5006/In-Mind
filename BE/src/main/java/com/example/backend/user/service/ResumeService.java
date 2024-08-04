package com.example.backend.user.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.RestApiException;
import com.example.backend.user.dto.ResumeRequestDto;
import com.example.backend.user.dto.ResumeResponseDto;
import com.example.backend.user.dto.ResumeUpdateRequestDto;
import com.example.backend.user.entity.Resume;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.ResumeRepository;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeResponseDto getResume(Long userId) {
        Resume resume = resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        return ResumeResponseDto.fromEntity(resume);
    }

    @Transactional
    public void saveResume(ResumeRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Resume resume = Resume.builder()
                .user(user)
                .info(requestDto.getInfo())
                .build();

        resumeRepository.save(resume);
    }

    @Transactional
    public void updateResume(Long resumeId, ResumeUpdateRequestDto requestDto) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Resume updateResume = Resume.builder()
                .id(resumeId)
                .user(resume.getUser())
                .info(requestDto.getInfo())
                .build();

        resumeRepository.save(updateResume);
    }

    @Transactional
    public void deleteResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        resumeRepository.delete(resume);
    }
}
