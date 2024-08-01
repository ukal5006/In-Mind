import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';

const ReservationHistoryContainer = styled(Container)`
    width: 100%;
    height: 50%;
`;

const ReservationHistoryWrapper = styled(Wrapper)`
    width: 90%;
    height: 70%;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
`;

function ReservationHistory() {
    return (
        <ReservationHistoryContainer>
            <ReservationHistoryWrapper>상담예약내역</ReservationHistoryWrapper>
        </ReservationHistoryContainer>
    );
}

export default ReservationHistory;
