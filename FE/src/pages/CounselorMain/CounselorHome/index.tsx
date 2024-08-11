import ScheduleCalendar from './ScheduleCalendar';
import CalendarContainer from './CalendarContainer';
import CounselorHomeContainer from './CounselorHomeContainer';
import ReservationListContainer from './ReservationListContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationList from './ReservationList';
import { COREADRESERVE } from '../../../apis/reserveApi';
import userStore from '../../../stores/userStore';

export interface ReservationInfo {
  name: string;
}

function CounselorHome() {
  const { userInfo } = userStore();
  const [reservationList, setReservationList] = useState<ReservationInfo[]>();
  useEffect(() => {
    if (userInfo) {
      axios
        .get(COREADRESERVE(userInfo?.userIdx))
        .then((response) => setReservationList(response.data));
    }
    console.log(reservationList);
  }, [userInfo]);

  //받아온 데이터 달력에 건수로 표시
  //받아온 데이터 오른쪽 상담내역 div에 표시
  // 전체는 상담날짜 빠른순으로 전부 보여주기
  // 날짜 선택되면 선택된 날짜꺼만 보여주기
  // 이전 날짜의 예약 내역은 조회 안되고 클릭해도 안나오게
  return (
    <CounselorHomeContainer>
      <CalendarContainer>
        <ScheduleCalendar reservationList={reservationList} />
      </CalendarContainer>
      <ReservationListContainer>
        <ReservationList reservationList={reservationList} />
      </ReservationListContainer>
    </CounselorHomeContainer>
  );
}

export default CounselorHome;
