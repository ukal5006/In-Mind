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
    border: 1px solid black;
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
