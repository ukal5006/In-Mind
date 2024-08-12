import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';
import ContainerTop from '../../../components/ContainerTop';
import ContainerTopTitle from '../../../components/ContainerTopTitle';
import ContainerTopLink from '../../../components/ContainerTopLink';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import userStore from '../../../stores/userStore';
import { READREPORTSLIST } from '../../../apis/reportsApi';
import { useEffect, useState } from 'react';
import Btn from '../../../components/Btn';
import moment from 'moment';

interface Report {
  reportCreatedAt: string; // 문자열 형식의 날짜
  reportResult: string; // 보고서 결과
}

interface Child {
  childInfoIdx: number;
  childInfoName: string;
  reports: Report[];
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
  justify-content: flex-start;
  overflow-y: scroll;
`;
const DetailBtn = styled(Btn)``;

const TestHistoryList = styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 18px;
`;

const TestHistoryItem = styled.div``;
function TestHistory() {
  const { userInfo, token } = userStore();
  const [testHistory, setTestHistory] = useState<Child[]>(); // Child 타입 배열로 초기화

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
          const filteredChildren = response.data.children.filter(
            (child: Child) => child.reports.length > 0
          );
          const sortedChildren = filteredChildren.map((child: Child) => ({
            ...child,
            reports: child.reports.sort(
              (a, b) =>
                new Date(b.reportCreatedAt).getTime() -
                new Date(a.reportCreatedAt).getTime()
            ),
          }));
          console.log(sortedChildren);
          setTestHistory(sortedChildren);
        });
    }
  }, [userInfo, token]); // token도 의존성 배열에 추가

  return (
    <TestHistoryContainer>
      <TestHistoryWrapper>
        <ContainerTop>
          <ContainerTopTitle>검사 내역</ContainerTopTitle>
          <ContainerTopLink to="/user/testHistory">
            <FaPlus />
          </ContainerTopLink>
        </ContainerTop>

        {testHistory?.length !== 0 && testHistory !== undefined ? (
          testHistory.map((child) =>
            child.reports.map((report) => (
              <TestHistoryList>
                <TestHistoryItem key={report.reportCreatedAt}>
                  검사일: {moment(report.reportCreatedAt).format('YYYY-MM-DD')}
                </TestHistoryItem>
                <TestHistoryItem>이름: {child.childInfoName}</TestHistoryItem>
                <DetailBtn>자세히 보기</DetailBtn>
              </TestHistoryList>
            ))
          )
        ) : (
          <>검사 내역이 없습니다</>
        )}
      </TestHistoryWrapper>
    </TestHistoryContainer>
  );
}

export default TestHistory;
