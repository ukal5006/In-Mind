import styled from 'styled-components';
import Container from '../../components/Container';
import Text from '../../components/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { READREPORTS, READREPORTSLIST } from '../../apis/reportsApi';
import { Child, Detail } from '../UserMain/UserHome/TestHistory';
import userStore from '../../stores/userStore';
import moment from 'moment';
import Btn from '../../components/Btn';

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
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100vw;
    height: 100vh; */
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: white;
    width: 700px;
`;

const ImgContainer = styled.div``;

const ImgWrapper = styled.img`
    width: 210px;
    height: 297px;
`;

const ResultDiv = styled.div``;

const Item = styled.div``;

const DetailBtn = styled(Btn)``;

function TestHistory() {
    const { userInfo, token } = userStore();
    const [testHistory, setTestHistory] = useState<Child[]>(); // Child 타입 배열로 초기화
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState<Detail>();
    const handleDetail = (reportId: number) => {
        setIsDetail(true);
        axios
            .get(READREPORTS(reportId, userInfo?.userIdx), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((reponse) => setDetail(reponse.data));
    };

    useEffect(() => {
        if (userInfo?.userIdx) {
            axios
                .get(READREPORTSLIST(userInfo.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => {
                    const filteredChildren = response.data.children.filter((child: Child) => child.reports.length > 0);
                    const sortedChildren = filteredChildren.map((child: Child) => ({
                        ...child,
                        reports: child.reports.sort(
                            (a, b) => new Date(b.reportCreatedAt).getTime() - new Date(a.reportCreatedAt).getTime()
                        ),
                    }));
                    console.log(sortedChildren);
                    setTestHistory(sortedChildren);
                });
        }
    }, [userInfo, token]); // token도 의존성 배열에 추가
    return (
        <TestHistoryContainer>
            <Title>검사 내역</Title>
            <List>
                {testHistory?.length !== 0 && testHistory !== undefined ? (
                    testHistory.map((child) =>
                        child.reports.map((report) => (
                            <Card>
                                <Item key={report.reportCreatedAt}>
                                    검사일: {moment(report.reportCreatedAt).format('YYYY-MM-DD')}
                                </Item>
                                <Item>이름: {child.childInfoName}</Item>
                                <DetailBtn onClick={() => handleDetail(report.reportIdx)}>자세히 보기</DetailBtn>
                            </Card>
                        ))
                    )
                ) : (
                    <>검사 내역이 없습니다</>
                )}
            </List>
            {isDetail && (
                <ModalBackground>
                    <DetailContainer>
                        <ImgContainer>
                            <ImgWrapper src={detail?.houseImage} />
                            <ImgWrapper src={detail?.treeImage} />
                            <ImgWrapper src={detail?.personImage} />
                        </ImgContainer>
                        <ResultDiv>{detail?.reportResult}</ResultDiv>
                    </DetailContainer>
                    <Btn onClick={() => setIsDetail(false)}>닫기</Btn>
                </ModalBackground>
            )}
        </TestHistoryContainer>
    );
}

export default TestHistory;
