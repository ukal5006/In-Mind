import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 100%;
    height: 55px;
    position: absolute;
    top: -1px;
    border: 1px ${colors.gray};
    display: flex;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: hidden;  // 이를 추가하여 자식 요소가 모서리를 벗어나지 않도록 합니다.
`;

const HeaderLink = styled(Link)<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    background-color: ${(props) => (props.isActive ? colors.white : colors.lightGreen)};
    color: ${(props) => (props.isActive ? colors.black : colors.black)};
    font-weight: ${(props) => (props.isActive ? '700' : '500')};
    &:first-child {
        border-right: 1px solid ${colors.veryLightGray};  // 첫 번째 링크의 오른쪽에 border 추가
    }
`;

function JoinHeader() {
    const location = useLocation();
    const isUserActive = location.pathname === '/join/user';
    const isCounselorActive = location.pathname === '/join/counselor';

    return (
        <HeaderContainer>
            <HeaderLink to="user" isActive={isUserActive}>
                일반 유저
            </HeaderLink>
            <HeaderLink to="counselor" isActive={isCounselorActive}>
                상담사
            </HeaderLink>
        </HeaderContainer>
    );
}

export default JoinHeader;
