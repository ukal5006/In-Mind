package com.ssafy.inmind;

import com.ssafy.inmind.child.dto.ChildRequestDto;
import com.ssafy.inmind.child.dto.ChildUpdateRequestDto;
import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.child.repository.ChildRepository;
import com.ssafy.inmind.child.service.ChildService;
import com.ssafy.inmind.user.dto.UserRequestDto;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import com.ssafy.inmind.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional   //각각의 테스트 메서드에 대해 트랜잭션을 시작하고, 테스트가 종료되면 롤백
class ChildTest {

    @Autowired
    private UserService userService;

    @Autowired
    private ChildService childService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChildRepository childRepository;

    private Long userIdx;

    @BeforeEach // 테스트 전에 필요한 초기화 작업 수행
    public void setUp() {
        // 유저 등록
        UserRequestDto userRequestDto = new UserRequestDto("test@naver.com", "q1w2e3r4!", "testUser", "01012341234", "USER");
        userService.saveUser(userRequestDto);
    }

    @Test
    @DisplayName("아이 등록test")
    public void saveChild() {
        //given
        Optional<User> user = userRepository.findByUserEmail("test@naver.com");
        userIdx = user.get().getId();

        ChildRequestDto child = new ChildRequestDto(userIdx, "이용성", "19981002");

        //when
        childService.saveChild(child);

        //then
        List<Child> childList = childRepository.findByUserId(userIdx);

        // 검증: childList가 비어 있지 않음을 확인
        assertThat(childList).isNotEmpty();

        // 검증: 첫 번째 Child 객체의 속성 값이 예상한 값과 일치하는지 확인
        Child savedChild = childList.get(0);
        assertThat(savedChild.getUser().getId()).isEqualTo(userIdx);
        assertThat(savedChild.getName()).isEqualTo("이용성");
        assertThat(savedChild.getBirthday()).isEqualTo("19981002");
    }

    @Test
    @DisplayName("아이 목록test")
    public void getChildList() {
        //given
        Optional<User> user = userRepository.findByUserEmail("test@naver.com");
        userIdx = user.get().getId();

        ChildRequestDto child1 = new ChildRequestDto(userIdx, "이용성", "19981002");
        ChildRequestDto child2 = new ChildRequestDto(userIdx, "이용훈", "19980108");
        //when
        childService.saveChild(child1);
        childService.saveChild(child2);

        //then
        List<Child> childList = childRepository.findByUserId(userIdx);

        // 검증: childList가 비어 있지 않음을 확인
        assertThat(childList).isNotEmpty();

        assertThat(childList).size().isEqualTo(2);
    }

    @Test
    @DisplayName("아이정보 수정 test")
    public void updateChild() {
        //given
        Optional<User> user = userRepository.findByUserEmail("test@naver.com");
        userIdx = user.get().getId();

        ChildRequestDto child = new ChildRequestDto(userIdx, "이용성", "19981002");

        //when
        childService.saveChild(child);
        List<Child> childList = childRepository.findByUserId(userIdx);
        Child savedChild = childList.get(0);

        Long childId = savedChild.getId();

        ChildUpdateRequestDto updateRequestDto = new ChildUpdateRequestDto("이용성", "19981001");

        childService.updateChild(childId, updateRequestDto);

        //then
        Optional<Child> updateChild = childRepository.findById(childId);
        assertThat(updateChild).isNotEmpty();
        assertThat(updateChild.get().getName()).isEqualTo("이용성");
        assertThat(updateChild.get().getBirthday()).isEqualTo("19981001");

    }

    @Test
    @DisplayName("아이정보 삭제 test")
    public void deleteChild() {
        //given
        Optional<User> user = userRepository.findByUserEmail("test@naver.com");
        userIdx = user.get().getId();

        ChildRequestDto child = new ChildRequestDto(userIdx, "이용성", "19981002");

        //when
        childService.saveChild(child);
        List<Child> childList = childRepository.findByUserId(userIdx);
        Child savedChild = childList.get(0);

        Long childId = savedChild.getId();

        childService.deleteChild(childId);

        //then
        Optional<Child> deleteChild = childRepository.findById(childId);
        assertThat(deleteChild).isEmpty();
    }
}