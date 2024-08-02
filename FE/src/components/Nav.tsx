import React, { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import SmallLogo from './SmallLogo';
import { Link } from 'react-router-dom';
import { colors } from '../theme/colors';
import { IoMenu } from 'react-icons/io5';
import Btn from './Btn';

const NavContainer = styled(Container)`
    width: 100vw;
    height: 80px;
    min-width: 700px;
    justify-content: space-between;
    padding: 0px 10px;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;

const Menu = styled.div`
    width: 33%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer; /* 클릭 가능하게 표시 */
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 80px; /* 네비게이션 아래에 위치 */
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    box-shadow: 0 4px 4px -4px black;
    z-index: 1; /* 다른 요소 위에 표시 */
`;

const MenuItem = styled(Link)`
    display: block;
    padding: 10px;
    text-decoration: none;
    color: ${colors.black};

    &:hover {
        background-color: ${colors.lightGray};
    }
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

const LogoutBtn = styled(Btn)`
    margin-left: 10px;
    font-size: 16px;
    padding: 5px;
    background-color: ${colors.red};
    color: ${colors.white};
`;

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // 메뉴 상태 토글
    };

    return (
        <NavContainer>
            <Menu onClick={toggleMenu}>
                <IoMenu />
            </Menu>
            <SmallLogo />
            <UserInfoContainer>
                <UserInfoWrapper to="mypage">user님, 환영합니다!</UserInfoWrapper>
                <LogoutBtn>로그아웃</LogoutBtn>
            </UserInfoContainer>
            {menuOpen && (
                <DropdownMenu>
                    <MenuItem to="/item1">메뉴 아이템 1</MenuItem>
                    <MenuItem to="/item2">메뉴 아이템 2</MenuItem>
                    <MenuItem to="/item3">메뉴 아이템 3</MenuItem>
                </DropdownMenu>
            )}
        </NavContainer>
    );
}

export default Nav;
