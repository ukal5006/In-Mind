import styled from 'styled-components';
import Container from '../../../components/Container';

const ChildTestContainer = styled(Container)`
    width: 90%;
    height: 80%;
    padding: 100px;
    border: 1px solid black;
    border-radius: 10px;
`;

function ChildTestResult() {
    return <ChildTestContainer>아이 정보 & 검사 결과</ChildTestContainer>;
}

export default ChildTestResult;
