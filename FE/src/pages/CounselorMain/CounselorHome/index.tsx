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
    date: string; // 예약 날짜 추가
}

function CounselorHome() {
    const { userInfo } = userStore();
    const [reservationList, setReservationList] = useState<ReservationInfo[]>();
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜 상태 추가
    const { token } = userStore();

    useEffect(() => {
        if (userInfo) {
            axios
                .get(COREADRESERVE(userInfo?.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => setReservationList(response.data))
                .catch((error) => console.log(error));
        }
    }, [userInfo]);

    // 선택된 날짜를 설정하는 함수
    const handleDateSelect = (dates: (string | null)[]) => {
        // 배열에서 첫 번째 날짜만 사용하거나, 필요한 다른 로직을 구현
        setSelectedDate(dates[0]); // 첫 번째 날짜만 설정
    };

    const filteredReservations = selectedDate
        ? reservationList?.filter((reservation) => reservation?.date === selectedDate)
        : reservationList;

    //받아온 데이터 달력에 건수로 표시
    //받아온 데이터 오른쪽 상담내역 div에 표시
    // 전체는 상담날짜 빠른순으로 전부 보여주기
    // 날짜 선택되면 선택된 날짜꺼만 보여주기
    // 이전 날짜의 예약 내역은 조회 안되고 클릭해도 안나오게
    return (
        <CounselorHomeContainer>
            <CalendarContainer>
                <ScheduleCalendar
                    reservationList={reservationList}
                    onDateSelect={handleDateSelect} // 날짜 선택 핸들러 전달
                />
            </CalendarContainer>
            <ReservationListContainer>
                <ReservationList reservationList={reservationList} selectedDate={selectedDate} />
            </ReservationListContainer>
        </CounselorHomeContainer>
    );
}

export default CounselorHome;
