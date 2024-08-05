package com.ssafy.inmind.user.controller;

import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.UserLoginRequestDto;
import com.ssafy.inmind.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "유저", description = "Swagger 테스트")
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Operation(summary = "로그인", description = "로그인 기능")
    @PostMapping
    public ResponseEntity<String> login(@RequestBody UserLoginRequestDto loginDto) throws RestApiException {
        String token = userService.login(loginDto);
        System.out.println(token);
//        return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.ok(token);
    }

    @Operation(summary = "JWT 테스트", description = "JWT 테스트 API")
    @GetMapping("JwtTest")
    public ResponseEntity<String> jwtTest() throws RestApiException {
        return ResponseEntity.ok("JWT가 정상적으로 작동되고 있습니다.");
    }
}
