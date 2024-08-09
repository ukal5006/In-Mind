import styled from 'styled-components';
import Container from '../../components/Container';
import Text from '../../components/Text';

const TestHistoryContainer = styled(Container)`
    margin-top: 20px;
    height: calc(100vh - 120px);
    width: 500px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow-y: scroll;
    position: relative;
`;

const Title = styled(Text)`
    /* margin-top: 20px; */
    padding: 10px 0;
    width: 500px;
    font-size: 20px;
    font-weight: 700;
    position: fixed;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    /* background-color: tomato; */
    background-color: white;
`;

const List = styled.ul`
    margin-top: 60px;
`;

const Card = styled.div`
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    width: 450px;
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Item = styled.div``;

function TestHistory() {
    return (
        <TestHistoryContainer>
            <Title>검사 내역</Title>
            <List>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
                <Card>
                    <Item>2024.07.19(금)</Item>
                    <Item>HTP 검사(T)</Item>
                    <Item>이용훈</Item>
                    <Item>검사결과.pdf</Item>
                </Card>
            </List>
        </TestHistoryContainer>
    );
}

export default TestHistory;
