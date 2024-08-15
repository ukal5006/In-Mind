import { Outlet, useNavigate } from 'react-router-dom';
import UserContainer from './UserContainer';
import Nav from '../../components/Nav';
import Wrapper from '../../components/Wrapper';
import styled from 'styled-components';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import { useEffect } from 'react';

const UserWrapper = styled(Wrapper)`
    max-width: 1200px;
`;

function UserMain() {
    const childStore = useChildStore();
    const navigate = useNavigate();

    const { setToken, setUserInfo } = userStore();

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

    // useEffect(() => {
    //     if (userInfo && token) {
    //         childStore.readAllChildren(userInfo?.userIdx, token);
    //     }
    // }, []);

    return (
        <UserContainer>
            <Nav />
            <UserWrapper>
                <Outlet />
            </UserWrapper>
        </UserContainer>
    );
}

export default UserMain;
