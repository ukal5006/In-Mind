import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Btn from '../../components/Btn';
import { Link } from 'react-router-dom';

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

function CounselorInfo() {
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
                    <InfoListItem>이름 : 오은영</InfoListItem>
                    <Line />
                    <InfoListItem>이메일 : counselor@naver.com</InfoListItem>
                    <Line />
                    <InfoListItem>전화번호 : 010-5050-5050</InfoListItem>
                    <Line />
                    <InfoListItem>한줄소개 : 한국 최고의 심리상담가 오은영 입니다.</InfoListItem>
                    <Line />
                    <InfoListItem>
                        <UpdateBtn>수정하기</UpdateBtn>
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
        </CounselorInfoContainer>
    );
}

export default CounselorInfo;
