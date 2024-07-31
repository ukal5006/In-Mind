import { Outlet } from 'react-router-dom';
import CounselorContainer from './CounselorContainer';
import Nav from '../../components/Nav';

function CounselorMain() {
    return (
        <CounselorContainer>
            <Nav />
            <Outlet />
        </CounselorContainer>
    );
}

export default CounselorMain;
