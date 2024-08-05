import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';
import testHistoryInfo from '../../../testData/testHistoryInfo';
import ContainerTop from '../../../components/ContainerTop';
import ContainerTopTitle from '../../../components/ContainerTopTitle';
import ContainerTopLink from '../../../components/ContainerTopLink';
import { FaPlus } from 'react-icons/fa';

interface testInfo {
    date: string;
    testType: string;
    name: string;
    result: string;
}

const TestHistoryContainer = styled(Container)`
    width: 100%;
    height: 50%;
`;

const TestHistoryWrapper = styled(Wrapper)`
    width: 90%;
    height: 70%;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    flex-direction: column;
    justify-content: space-between;
`;

const TestHistoryList = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    justify-content: space-evenly;
    align-items: center;
`;

const TestHistoryItem = styled.div``;
function TestHistory() {
    return (
        <TestHistoryContainer>
            <TestHistoryWrapper>
                <ContainerTop>
                    <ContainerTopTitle>검사 내역</ContainerTopTitle>
                    <ContainerTopLink to="">
                        <FaPlus />
                    </ContainerTopLink>
                </ContainerTop>
                {testHistoryInfo.map((e: testInfo) => {
                    return (
                        <TestHistoryList>
                            <TestHistoryItem>{e.date}</TestHistoryItem>
                            <TestHistoryItem>{e.testType}</TestHistoryItem>
                            <TestHistoryItem>{e.name}</TestHistoryItem>
                            <TestHistoryItem>{e.result}</TestHistoryItem>
                        </TestHistoryList>
                    );
                })}
            </TestHistoryWrapper>
        </TestHistoryContainer>
    );
}

export default TestHistory;
