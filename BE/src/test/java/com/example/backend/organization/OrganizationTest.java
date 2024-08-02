package com.example.backend.organization;

import com.example.backend.user.entity.Organization;
import com.example.backend.user.repository.OrganizationRepository;
import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
public class OrganizationTest {

    @Autowired
    OrganizationRepository orgRepo;

//    @BeforeEach
//    public void before() {
//        orgRepo.deleteAll();
//    }

    @DisplayName("기관 생성 test입니다.")
    @Test
    public void createOrg(){
        String name = "test센터";
        String addr = "test주소";
        // given
        orgRepo.save(Organization.builder()
                .name(name)
                .addr(addr)
                .tel("0631231234")
                .build()
        );
        // when
        List<Organization> orgList = orgRepo.findAll();

        //then
        Organization org = orgList.get(0);

        Assertions.assertEquals(org.getName(), name);
    }

    @DisplayName("기관을 이름으로 검색합니다.")
    @Test
    public void getList() {
        // given
        String keyword = "test";

        //when
        List<Organization> orgList = orgRepo.findByNameLike(keyword);

        //then
        Organization org = orgList.get(0);

        Assertions.assertEquals(org.getName(), "test센터");
    }


}
