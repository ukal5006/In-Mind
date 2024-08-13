package com.ssafy.inmind;

import com.ssafy.inmind.user.dto.CounselorRequestDto;
import com.ssafy.inmind.user.dto.UserRequestDto;
import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import com.ssafy.inmind.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional   //각각의 테스트 메서드에 대해 트랜잭션을 시작하고, 테스트가 종료되면 롤백
public class UserTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach // 테스트 전에 필요한 초기화 작업 수행
    public void setUp() {
        // 유저, 상담사 등록
        // 기관 등록
    }

    @Test
    @DisplayName("유저 회원 가입 테스트")
    public void addUser() {
        // Given
        UserRequestDto userRequestDto = new UserRequestDto("test@naver.com", "q1w2e3r4!", "testUser", "01012341234", "USER");

        // When
        userService.saveUser(userRequestDto);

        // Then
        Optional<User> savedUser = userRepository.findByUserEmail("test@naver.com");
        assertThat(savedUser).isPresent();
        assertThat(savedUser.get().getEmail()).isEqualTo("test@naver.com");
        assertThat(savedUser.get().getName()).isEqualTo("testUser");
        assertThat(savedUser.get().getTel()).isEqualTo("01012341234");
        assertThat(savedUser.get().getRole()).isEqualTo(RoleStatus.USER);
    }

    @Test
    @DisplayName("상담사 회원 가입 테스트")
    public void addCounselor() {
        // Given
        CounselorRequestDto counselorRequestDto = new CounselorRequestDto(0L, "counselor@naver.com", "q1w2e3r4!", "testUser", "01012341234", "COUNSELOR");

        // When
        userService.saveCounselor(counselorRequestDto);

        // Then
        Optional<User> savedUser = userRepository.findByUserEmail("counselor@naver.com");
        assertThat(savedUser).isPresent();
        assertThat(savedUser.get().getEmail()).isEqualTo("counselor@naver.com");
        assertThat(savedUser.get().getName()).isEqualTo("testUser");
        assertThat(savedUser.get().getTel()).isEqualTo("01012341234");
        assertThat(savedUser.get().getRole()).isEqualTo(RoleStatus.COUNSELOR);
    }

    @Test
    @DisplayName("이메일 중복 검사 테스트")
    public void duplicateEmail() {
        // Given
        UserRequestDto userRequestDto = new UserRequestDto("test@naver.com", "q1w2e3r4!", "testUser", "01012341234", "USER");

        // When
        userService.saveUser(userRequestDto);

        // Then
        assertThat(userService.checkUserEmail("test@naver.com")).isEqualTo("duplicated");
    }


}