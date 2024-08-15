import BigLogo from '../../components/BigLogo';
import JoinContainer from './JoinContainer';
import JoinHeader from './JoinHeader';
import JoinWrapper from './JoinWrapper';
import { Outlet } from 'react-router-dom';

function Join() {
    return (
        <JoinContainer>
            <BigLogo />
            <JoinWrapper>
                <JoinHeader />
                <Outlet />
            </JoinWrapper>
        </JoinContainer>
    );
}

export default Join;
