import styled from 'styled-components';
import Container from '../components/Container';
import Btn from '../components/Btn';
import { colors } from '../theme/colors';
import React from 'react';

const OverviewContainer = styled(Container)`
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`;

const LoginBtn = styled(Btn)`
    height: 50px;
    width: 300px;
    background-color: ${colors.blue};
    color: ${colors.white};
    font-size: 20px;
    font-weight: 700;
`;

function Overview() {
    return (
        <OverviewContainer>
            <LoginBtn>로그인 하고 무료로 검사받기</LoginBtn>
        </OverviewContainer>
    );
}

export default Overview;
