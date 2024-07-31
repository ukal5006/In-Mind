import styled from 'styled-components';
import Container from './Container';
import SmallLogo from './SmallLogo';
import { Link } from 'react-router-dom';
import { colors } from '../theme/colors';

const NavContainer = styled(Container)`
    width: 100vw;
    height: 80px;
    min-width: 700px;
    justify-content: space-between;
    padding: 0px 10px;
    box-sizing: border-box;
    border: 1px solid ${colors.gray};
    box-shadow: 0 4px 4px -4px black;
`;

const Menu = styled.div`
    width: 33%;
    height: 40px;
`;

const UserInfoContainer = styled.div`
    width: 33%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 20px;
    box-sizing: border-box;
`;

const UserInfoWrapper = styled(Link)``;

function Nav() {
    return (
        <NavContainer>
            <Menu />
            <SmallLogo />
            <UserInfoContainer>
                <UserInfoWrapper to="mypage">user님, 환영합니다!</UserInfoWrapper>
            </UserInfoContainer>
        </NavContainer>
    );
}

export default Nav;
