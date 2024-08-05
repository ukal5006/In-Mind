package com.ssafy.inmind.user.controller;

import com.ssafy.inmind.child.dto.ChildListResponseDto;
import com.ssafy.inmind.child.service.ChildService;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.CounselorRequestDto;
import com.ssafy.inmind.user.dto.UserLoginRequestDto;
import com.ssafy.inmind.user.dto.UserRequestDto;
import com.ssafy.inmind.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "유저", description = "Swagger 테스트")
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final ChildService childService;

    @Operation(summary = "유저 회원가입", description = "유저가 회원가입을 합니다.")
    @PostMapping("user")
    public ResponseEntity<Void> userJoin(@RequestBody UserRequestDto userRequestDto) throws RestApiException {
        userService.saveUser(userRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "상담사 회원가입", description = "상담사가 회원가입을 합니다.")
    @PostMapping("counselor")
    public ResponseEntity<Void> counselorJoin(@RequestBody CounselorRequestDto counselorRequestDto) throws RestApiException {
        userService.saveCounselor(counselorRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

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

    @Operation(summary = "자녀정보목록조회", description = "유저가 자녀정보목록을 조회합니다.")
    @GetMapping("/{userId}/child")
    public ResponseEntity<List<ChildListResponseDto>> getChildList(@PathVariable @Parameter(description = "유저번호") Long userId) {
        List<ChildListResponseDto> childList = childService.getChildList(userId);
        return ResponseEntity.ok(childList);
    }
}
