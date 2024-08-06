import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Btn from '../../components/Btn';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CounselorInfoContainer = styled(Container)`
    padding: 30px 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: start;
`;

const ProfileContainer = styled(Container)`
    width: 100%;
    justify-content: start;
    box-sizing: border-box;
    padding-left: 10px;
`;

const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${colors.gray};
    margin-right: 30px;
`;

const ProfileInfoWrapper = styled(Wrapper)`
    flex-direction: column;
    align-items: start;
`;

const ProfileName = styled(Text)`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    border-bottom: 2px solid ${colors.gray};
    margin: 10px 0px;
`;

const ProfileEmail = styled(Text)``;

const InfoContainer = styled(Container)`
    width: 90%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin: 20px;
`;

const InfoContainerHeader = styled(Text)`
    font-weight: 700;
    color: ${colors.gray};
`;

const InfoList = styled.ul`
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
`;

const InfoListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    align-items: center;
`;

const UpdateBtn = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    font-size: 14px;
`;

const DeleteIdLink = styled(Link)`
    &:hover {
        border-bottom: 1px solid black;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
`;

const ModalTitle = styled(Text)`
    font-weight: 700;
    margin-bottom: 20px;
`;

const ModalInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid ${colors.gray};
`;

const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    & > ${ModalInput} {
        width: 50px;
    }
`;

const ModalButton = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    width: 100%;
`;

function CounselorInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('오은영');
    const [email, setEmail] = useState('counselor@naver.com');
    const [phone, setPhone] = useState('010-5050-5050');
    const [intro, setIntro] = useState('한국 최고의 심리상담가 오은영 입니다.');
    const [startTime, setStartTime] = useState('19');
    const [endTime, setEndTime] = useState('22');

    const handleUpdate = () => {
        // 기본정보 업데이트 로직을 추가하세요.
        setIsModalOpen(false);
    };

    return (
        <CounselorInfoContainer>
            <ProfileContainer>
                <ProfileImage />
                <ProfileInfoWrapper>
                    <ProfileName>오은영</ProfileName>
                    <ProfileEmail>counselor@naver.com</ProfileEmail>
                </ProfileInfoWrapper>
            </ProfileContainer>
            <Line />
            <InfoContainer>
                <InfoContainerHeader>기본정보</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>이름 : {name}</InfoListItem>
                    <Line />
                    <InfoListItem>이메일 : {email}</InfoListItem>
                    <Line />
                    <InfoListItem>전화번호 : {phone}</InfoListItem>
                    <Line />
                    <InfoListItem>한줄소개 : {intro}</InfoListItem>
                    <Line />
                    <InfoListItem>
                        상담 가능 시간 : {startTime}시 ~ {endTime}시
                    </InfoListItem>
                    <Line />
                    <InfoListItem>
                        <UpdateBtn onClick={() => setIsModalOpen(true)}>수정하기</UpdateBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>
            <Line />
            <InfoContainer>
                <InfoContainerHeader>보안설정</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>
                        비밀번호
                        <UpdateBtn>수정하기</UpdateBtn>
                    </InfoListItem>
                    <Line />
                    <InfoListItem>
                        <DeleteIdLink to="deleteId">회원탈퇴▶</DeleteIdLink>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalTitle>기본정보 수정</ModalTitle>
                        <ModalInput
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                        />
                        <ModalInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일"
                        />
                        <ModalInput
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="전화번호"
                        />
                        <ModalInput
                            type="text"
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            placeholder="한줄소개"
                        />
                        <ModalWrapper>
                            <ModalInput
                                type="text"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                placeholder="시작시간"
                            />
                            시~
                            <ModalInput
                                type="text"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                placeholder="종료시간"
                            />
                            시
                        </ModalWrapper>
                        <ModalButton onClick={handleUpdate}>저장하기</ModalButton>
                        <ModalButton onClick={() => setIsModalOpen(false)}>취소하기</ModalButton>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </CounselorInfoContainer>
    );
}

export default CounselorInfo;
