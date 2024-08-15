import styled from 'styled-components';
import Container from '../../components/Container';
import Text from '../../components/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { READREPORTS, READREPORTSLIST } from '../../apis/reportsApi';
import {
    Child,
    CloseBtn,
    Detail,
    DetailContainer,
    DetailTitle,
    ImgContainer,
    ImgWrapper,
    ModalBackground,
} from '../UserMain/UserHome/TestHistory';
import userStore from '../../stores/userStore';
import moment from 'moment';
import Btn from '../../components/Btn';
import Glass from '../../components/Glass';
import { colors } from '../../theme/colors';
import { IoClose } from 'react-icons/io5';

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
    ${Glass}
`;

const Title = styled(Text)`
    /* margin-top: 20px; */
    padding: 10px 0;
    width: 500px;
    font-size: 20px;
    font-weight: 700;
    position: fixed;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
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
    ${Glass}
`;

const ResultDiv = styled.div``;

const Item = styled.div``;

const DetailBtn = styled(Btn)`
    background-color: ${colors.okGreen};
    color: white;
`;

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
        <>
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
            </TestHistoryContainer>
            {isDetail && (
                <ModalBackground>
                    <DetailContainer>
                        <DetailTitle>검사 자세히보기</DetailTitle>
                        <ImgContainer>
                            <ImgWrapper src={detail?.houseImage} />
                            <ImgWrapper src={detail?.treeImage} />
                            <ImgWrapper src={detail?.personImage} />
                        </ImgContainer>
                        <ResultDiv>{detail?.reportResult}</ResultDiv>
                        <CloseBtn onClick={() => setIsDetail(false)}>
                            <IoClose />
                        </CloseBtn>
                    </DetailContainer>
                </ModalBackground>
            )}
        </>
    );
}

export default TestHistory;
