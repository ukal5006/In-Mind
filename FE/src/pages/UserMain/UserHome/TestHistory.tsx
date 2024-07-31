import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';

const TestHistoryContainer = styled(Container)`
    width: 100%;
    height: 50%;
`;

const TestHistoryWrapper = styled(Wrapper)`
    width: 90%;
    height: 70%;
    border: 1px solid black;
    border-radius: 10px;
`;
function TestHistory() {
    return (
        <TestHistoryContainer>
            <TestHistoryWrapper>검사내역</TestHistoryWrapper>
        </TestHistoryContainer>
    );
}

export default TestHistory;
