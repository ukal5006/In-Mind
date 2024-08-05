import styled from 'styled-components';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';

const CounselorMyPageListContainer = styled(Container)`
    height: 95%;
    width: 30%;
    border: 1px solid black;
    border-radius: 10px;
    flex-direction: column;
`;

const ProfileContainer = styled(Container)`
    width: 100%;
    height: 50%;
    flex-direction: column;
`;
const ProfileImage = styled.div`
    background-color: tomato;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 30px;
`;
const ProfileName = styled(Text)`
    font-size: 30px;
    font-weight: 700;
`;

const ListItemContainer = styled(Container)`
    width: 100%;
    height: 50%;
    flex-direction: column;
    justify-content: space-evenly;
`;

const ListItem = styled(Link)`
    border-bottom: 2px solid black;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
`;

function CounselorMyPageList() {
    return (
        <CounselorMyPageListContainer>
            <ProfileContainer>
                <ProfileImage />
                <ProfileName>오은영</ProfileName>
            </ProfileContainer>
            <ListItemContainer>
                <ListItem to="counselorInfo">상담사 정보</ListItem>
                <ListItem to="counselorCareers">이력 정보</ListItem>
                <ListItem to="myReviews">상담 리뷰</ListItem>
            </ListItemContainer>
        </CounselorMyPageListContainer>
    );
}

export default CounselorMyPageList;
