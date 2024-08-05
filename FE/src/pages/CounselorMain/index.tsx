import { Outlet } from 'react-router-dom';
import CounselorContainer from './CounselorContainer';
import Nav from '../../components/Nav';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';

const CounselorWrapper = styled(Wrapper)`
    height: calc(100vh - 80px);
    max-width: 1200px;
`;

function CounselorMain() {
    return (
        <CounselorContainer>
            <Nav />
            <CounselorWrapper>
                <Outlet />
            </CounselorWrapper>
        </CounselorContainer>
    );
}

export default CounselorMain;
