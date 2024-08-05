package com.ssafy.inmind.user.service;

import com.ssafy.inmind.config.JwtUtil;
import com.ssafy.inmind.user.dto.UserLoginRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    @Value("${jwt.secret}")
    private String secretKey;

    private Long expiredMs = 1000 * 60 * 60L;
    public String login(UserLoginRequestDto loginDto) {

        return JwtUtil.createJwt(loginDto.getUsername(), secretKey, expiredMs);
    }
}
