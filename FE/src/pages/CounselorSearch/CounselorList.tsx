import React, { useState } from 'react';
import useCounselorStore, { Counselor } from '../../stores/counselorStore';
import styled, { keyframes } from 'styled-components';
import Text from '../../components/Text';
import Btn from '../../components/Btn';
import Container from '../../components/Container';
import Calendar from 'react-calendar';
import './Calendar.css';
import { SelectedDate } from '../CounselorMain/CounselorHome/ScheduleCalendar';
import moment from 'moment';

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
`;

const CounselorDetail = styled.div`
  /* box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04); */
  border-radius: 10px;
  width: 700px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
`;

const Title = styled(Text)`
  padding: 10px 0;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  /* box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04); */
  /* background-color: tomato; */
  /* background-color: white; */
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

const ReviewContainer = styled(Container)`
  background-color: turquoise;
  width: 600px;
  height: 300px;
`;

const CloseBtn = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: tomato;
`;

const Reservation = styled.div`
  box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  width: 450px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: aqua;
`;

// const ListContainer = styled(Container)`
//     overflow-y: scroll;
//     flex-direction: column;
//     height: 400px;
// `;

const TimeTable = styled.div``;

const Card = styled.div`
  margin-top: 10px;
  width: 600px;
  height: 200px;
  box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
`;

const ItemWrapper = styled.div`
  width: 400px;
`;

const Profile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: tomato;
`;

const Name = styled(Text)`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
`;

const CounselorList: React.FC = () => {
  const { counselors } = useCounselorStore();
  const { filteredCounselors, currentPage } = useCounselorStore();
  const [detail, setDetail] = useState<Counselor>();
  const counselorsPerPage = 5;
  const startIndex = (currentPage - 1) * counselorsPerPage;
  const endIndex = startIndex + counselorsPerPage;
  const displayedCounselors = filteredCounselors.slice(startIndex, endIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReserve, setIsReserve] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const handleDetail = (counselor: Counselor) => {
    setDetail(counselor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsReserve(false);
  };

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return (
    <div>
      {counselors.map((counselor) => (
        <Card onClick={() => handleDetail(counselor)}>
          <Profile />
          <ItemWrapper>
            <Name>{counselor.name}</Name>
            <Text>{counselor.intro}</Text>
            <Text>{counselor.tel}</Text>
            <Text>{counselor.organizationName} 소속</Text>
            <Text>{counselor.organizationTel}</Text>
            <Text>리뷰 평점 : {counselor.reviewAverage}/5</Text>
            <Text>{counselor.reviewCount}개의 리뷰</Text>
          </ItemWrapper>
        </Card>
      ))}
      {isModalOpen && (
        <ModalBackground>
          <CounselorDetail>
            <Title>상담사 자세히 보기</Title>
            <Profile />
            <Name>{detail?.name}</Name>
            <Text>{detail?.intro}</Text>
            <Text>{detail?.tel}</Text>
            <Text>{detail?.organizationName} 기관소속</Text>
            <Text>{detail?.organizationTel} 기관번호</Text>
            <Text>리뷰 평점 : {detail?.reviewAverage}/5</Text>
            <Text>{detail?.reviewCount}개의 리뷰</Text>
            <Text>{detail?.userIdx}</Text>
            <ReviewContainer>리뷰 칸</ReviewContainer>
            <Btn onClick={() => setIsReserve(true)}>예약하기</Btn>
          </CounselorDetail>

          {isReserve && (
            <Reservation>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="gregory"
                view="month"
                next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                minDetail="year" // 10년단위 년도 숨기기
                formatDay={(locale, date) => moment(date).format('D')}
                formatMonthYear={(locale, date) =>
                  moment(date).format('YYYY. MM')
                } // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
                locale="kr"
              />
              <>{moment(selectedDate).format('YYYY-MM-DD')}</>
            </Reservation>
          )}
          <Btn onClick={handleCloseModal}>닫기</Btn>
        </ModalBackground>
      )}
    </div>
  );
};

export default CounselorList;
