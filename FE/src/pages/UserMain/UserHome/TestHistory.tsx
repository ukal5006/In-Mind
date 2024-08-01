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
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;
function TestHistory() {
    return (
        <TestHistoryContainer>
            <TestHistoryWrapper>검사내역</TestHistoryWrapper>
        </TestHistoryContainer>
    );
}

export default TestHistory;
