import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 100%;
    height: 40px;
    position: absolute;
    top: -1px;
    border: 1px solid ${colors.gray};
    display: flex;
`;

const HeaderLink = styled(Link)<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    background-color: ${(props) => (props.isActive ? colors.lightGreen : colors.white)}; /* 활성화 시 배경색 변경 */
    color: ${(props) => (props.isActive ? colors.black : colors.gray)}; /* 활성화 시 배경색 변경 */
    font-weight: ${(props) => (props.isActive ? '700' : '500')}; /* 활성화 시 글자색 변경 */
    &:hover {
        transition: 1s;
        background-color: ${colors.lightGreen};
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
