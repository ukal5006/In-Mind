import { Outlet } from 'react-router-dom';
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
    const { userInfo, token } = userStore();
    useEffect(() => {
        if (userInfo && token) {
            childStore.readAllChildren(userInfo?.userIdx, token);
        }
    }, []);

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
