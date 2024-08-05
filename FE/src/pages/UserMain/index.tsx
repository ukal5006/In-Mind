import { Outlet } from 'react-router-dom';
import UserContainer from './UserContainer';
import Nav from '../../components/Nav';
import Wrapper from '../../components/Wrapper';
import styled from 'styled-components';

const UserWrapper = styled(Wrapper)`
    max-width: 1200px;
`;

function UserMain() {
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
