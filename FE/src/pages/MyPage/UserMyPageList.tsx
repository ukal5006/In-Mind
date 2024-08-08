import styled from 'styled-components';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';
import defaultImage from './defaultImg.png';
import userStore from '../../stores/userStore';

const MyPageListContainer = styled(Container)`
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
const ProfileImage = styled.img`
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

function MyPageList() {
    const { userInfo } = userStore((state) => state);

    return (
        <MyPageListContainer>
            <ProfileContainer>
                <ProfileImage src={defaultImage} />
                <ProfileName>{userInfo?.userName}</ProfileName>
            </ProfileContainer>
            <ListItemContainer>
                <ListItem to="userInfo">내 정보</ListItem>
                <ListItem to="childInfo">아이 정보</ListItem>
            </ListItemContainer>
        </MyPageListContainer>
    );
}

export default MyPageList;
