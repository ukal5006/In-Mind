import { Outlet } from 'react-router-dom';
import UserContainer from './UserContainer';
import Nav from '../../components/Nav';

function UserMain() {
    return (
        <UserContainer>
            <Nav />
            <Outlet />
        </UserContainer>
    );
}

export default UserMain;
