import { Outlet, useNavigate } from 'react-router-dom';
import CounselorContainer from './CounselorContainer';
import Nav from '../../components/Nav';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import userStore from '../../stores/userStore';
import { useEffect } from 'react';
import useChildStore from '../../stores/childStore';

const CounselorWrapper = styled(Wrapper)`
    height: calc(100vh - 80px);
    max-width: 1200px;
`;

function CounselorMain() {
    const navigate = useNavigate();

    const { setToken, setUserInfo } = userStore();
    const childStore = useChildStore();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('jwt');

        // 유저 정보가 있으면 자동 로그인
        if (userInfo && token) {
            const parsedUserInfo = JSON.parse(userInfo);
            setToken(token);
            setUserInfo(parsedUserInfo);
            console.log('토큰있음');

            // 역할에 따라 적절한 페이지로 이동
            if (parsedUserInfo.userRole === 'USER') {
                childStore.readAllChildren(parsedUserInfo?.userIdx, token);
                navigate('/user/home');
            } else {
                navigate('/counselor/home');
            }
        }
    }, [navigate, setToken, setUserInfo]);
    return (
        <CounselorContainer>
            <Nav />
            <CounselorWrapper>
                <Outlet />
            </CounselorWrapper>
        </CounselorContainer>
    );
}

export default CounselorMain;
