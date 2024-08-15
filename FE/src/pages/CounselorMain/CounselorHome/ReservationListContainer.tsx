import styled from 'styled-components';
import Container from '../../../components/Container';
import Glass from '../../../components/Glass';

const ReservationListContainer = styled(Container)`
    height: 90%;
    width: 30%;
    padding: 0px;
    border: 1px solid black;
    border-radius: 10px;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    ${Glass}
`;

export default ReservationListContainer;
