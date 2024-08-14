import { useCounselorStore } from '../../stores/counselorDetailStore';
import useReviewStore from '../../stores/reviewStore';
import styled from 'styled-components';
import Container from '../../components/Container';
import { Link, useLocation } from 'react-router-dom';
import Text from '../../components/Text';
import userStore from '../../stores/userStore';
import {colors} from '../../theme/colors'
import { FaUser } from "react-icons/fa";
import { useEffect } from 'react';

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
    background-color: ${colors.lightGray};
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledFaUser = styled(FaUser)`
    font-size: 100px; 
    color: white;  
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

interface ListItemProps {
    $isActive: boolean;
  }

const ListItem = styled(Link)<ListItemProps>`
  border-bottom: ${props => props.$isActive ? '2px solid black' : `2px solid ${colors.lightGray}`};
  padding-bottom: 10px;
  font-size: ${props => props.$isActive ? '28px' : '25px'};
  font-weight: 700;
  color: ${props => props.$isActive ? `${colors.darkGreen}` : `${colors.lightGray}`};
  transition: color 0.3s, font-size 0.3s;
`;

function CounselorMyPageList() {
    const location = useLocation();
    const { userInfo, token } = userStore((state) => state);
    const { counselor, fetchCounselor } = useCounselorStore();
    const {fetchReviews} = useReviewStore();

    useEffect(() => {
        if (userInfo?.userIdx&&token) {
            fetchCounselor(userInfo.userIdx, token);
            fetchReviews(userInfo.userIdx, token);
        }
    }, [userInfo, token, fetchCounselor]);

    return (
        <CounselorMyPageListContainer>
            <ProfileContainer>
                    <ProfileImage>
                        <StyledFaUser />
                    </ProfileImage>
                <ProfileName>{userInfo?.userName}</ProfileName>
            </ProfileContainer>
            <ListItemContainer>
                <ListItem to="counselorInfo" $isActive={location.pathname.endsWith('counselorInfo')}>
                    상담사 정보
                </ListItem>
                <ListItem to="counselorCareers" $isActive={location.pathname.endsWith('counselorCareers')}>
                    이력 정보
                </ListItem>
                <ListItem to="myReviews" $isActive={location.pathname.endsWith('myReviews')}>
                    상담 리뷰
                </ListItem>
            </ListItemContainer>
        </CounselorMyPageListContainer>
    );
}

export default CounselorMyPageList;
