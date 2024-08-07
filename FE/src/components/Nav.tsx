import styled from 'styled-components';
import Container from './Container';
import SmallLogo from './SmallLogo';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../theme/colors';
import Btn from './Btn';
import Wrapper from './Wrapper';
import userStore from '../stores/userStore';

const NavContainer = styled(Container)`
    width: 100vw;
    min-width: 700px;
    height: 60px;
    justify-content: space-between;
    padding: 0px 10px;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;

const LogoWrapper = styled(Wrapper)`
    width: 33%;
    justify-content: flex-start;
`;

const MenuContainer = styled(Container)`
    width: 33%;
    justify-content: space-evenly;
`;

const MenuItem = styled(Link)`
    font-size: 16px;
    font-weight: 700;
    &:hover {
        border-bottom: 2px solid black;
    }
`;

const UserInfoContainer = styled(Container)`
    width: 33%;
    height: 40px;
    padding-right: 20px;
    box-sizing: border-box;
    justify-content: flex-end;
`;

const LogoutBtn = styled(Btn)`
    margin-left: 10px;
    font-size: 16px;
    padding: 5px;
    background-color: ${colors.red};
    color: ${colors.white};
`;

function Nav() {
    const navigate = useNavigate();

    return (
        <NavContainer>
            <LogoWrapper>
                <SmallLogo />
            </LogoWrapper>
            <MenuContainer>
                <MenuItem to="test">검사하기</MenuItem>
                <MenuItem to="counselorSearch"> 상담사 예약하기</MenuItem>
            </MenuContainer>
            <UserInfoContainer>
                <Link to="mypage">님, 환영합니다!</Link>
                <LogoutBtn onClick={() => navigate('/')}>로그아웃</LogoutBtn>
            </UserInfoContainer>
        </NavContainer>
    );
}

export default Nav;
