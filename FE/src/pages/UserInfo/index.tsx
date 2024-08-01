// import UserInfoContainer from './UserInfoContainer';
// import UserProfileContainer from './UserProfileContainer';
// import UserProfileImage from './UserProfileImage';

// const tempUserInfo = {
//     name: '홍길동',
//     email: 'thunder@naver.com',
//     phone: '010-1234-5678',
//     nickName: '삼성맨',
//     region: '대전',
// };

// function UserInfo() {
//     return (
//         <UserInfoContainer>
//             <UserProfileContainer>
//                 <UserProfileImage></UserProfileImage>
//             </UserProfileContainer>
//         </UserInfoContainer>
//     );
// }

// export default UserInfo;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfilePicture = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 0 auto;
`;

const Name = styled.div`
    font-weight: bold;
    margin: 10px 0;
`;

const Email = styled.div`
    color: gray;
    margin-bottom: 20px;
`;

const Section = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const SectionTitle = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
`;

const EditButton = styled.button`
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
        background-color: #d0d0d0;
    }
`;

const Logout = styled.div`
    text-align: center;
    color: blue;
    cursor: pointer;
`;

const UserInfo = () => {
    return (
        <Container>
            <ProfilePicture />
            <Name>홍길동</Name>
            <Email>thunder@naver.com</Email>

            <Section>
                <SectionTitle>기본정보</SectionTitle>
                <Info>
                    <span>휴대전화 : 010-1234-5678</span>
                    <EditButton>수정</EditButton>
                </Info>
                <Info>
                    <span>닉네임 : 삼성맨</span>
                    <EditButton>수정</EditButton>
                </Info>
                <Info>
                    <span>지역 : 대전</span>
                    <EditButton>수정</EditButton>
                </Info>
            </Section>

            <Section>
                <SectionTitle>보안설정</SectionTitle>
                <Info>
                    <span>비밀번호</span>
                    <EditButton>수정</EditButton>
                </Info>
            </Section>

            <Logout>회원탈퇴</Logout>
        </Container>
    );
};

export default UserInfo;
