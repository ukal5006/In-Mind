import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';
import { ReservationInfo } from '.';

export type DatePiece = any | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface ScheduleCalendarProps {
    reservationList: ReservationInfo[] | undefined;
    onDateSelect: (dates: (string | null)[]) => void; // 날짜 배열을 받을 수 있도록 수정
}

const CustomCalendar = styled(Calendar)`
    border-radius: 1px solid black;
    width: 700px;

    .react-calendar__navigation {
        margin-top: 20px;
        .react-calendar__navigation__arrow {
            width: 25%;
            font-size: 30px;
            color: ${colors.darkGray};
        }
        .react-calendar__navigation__label {
            font-size: 30px;
        }
    }

    .react-calendar__month-view__weekdays {
        & > :first-child {
            color: ${colors.red};
        }
        & > div {
            border: 1px solid black;
            font-size: 18px;
            abbr {
                text-decoration: none !important;
            }
        }
    }
    .react-calendar__tile {
        border: 1px solid black;
    }
    .react-calendar__month-view__days__day {
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const ReservationDiv = styled.div`
    color: black;
`;

const Checkmark = styled.span`
    color: green;
    font-weight: bold;
`;

function ScheduleCalendar({ reservationList, onDateSelect }: ScheduleCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

    useEffect(() => {
        let formattedDate: (string | null)[];

        if (Array.isArray(selectedDate)) {
            formattedDate = selectedDate.map((date) => (date ? moment(date).format('YYYY-MM-DD') : null));
            onDateSelect(formattedDate); // 배열 전달
        } else {
            formattedDate = selectedDate ? [moment(selectedDate).format('YYYY-MM-DD')] : [null];
            onDateSelect(formattedDate); // 단일 날짜도 배열로 전달
        }
    }, [selectedDate]);

    // 예약 건수를 날짜별로 맵핑
    const reservationCountByDate = reservationList?.reduce((acc, reservation) => {
        const date = moment(reservation.date).format('YYYY-MM-DD'); // 예약 날짜 형식 맞추기
        acc[date] = (acc[date] || 0) + 1; // 해당 날짜의 예약 건수 증가
        return acc;
    }, {} as Record<string, number>);

    return (
        <>
            <CustomCalendar
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="gregory"
                view="month"
                next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                minDetail="year" // 10년단위 년도 숨기기
                formatDay={(locale, date) => moment(date).format('D')}
                formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
                locale="kr"
                tileContent={({ date }) => {
                    const formattedDate = moment(date).format('YYYY-MM-DD');
                    const count = reservationCountByDate?.[formattedDate] || 0;
                    return (
                        <ReservationDiv>
                            {count > 0 && <span>{count}건의 예약이 있습니다.</span>}
                            {moment(date).isBefore(moment(), 'day') && <Checkmark>✔️</Checkmark>}
                        </ReservationDiv>
                    );
                }}
            />
        </>
    );
}

export default ScheduleCalendar;
