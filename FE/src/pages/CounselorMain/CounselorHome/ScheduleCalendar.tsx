import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const CustomCalendar = styled(Calendar)`
    border-radius: 1px solid black;
    width: 700px;
    :nth-child(7n) {
        color: ${colors.blue};
    }

    .react-calendar__navigation {
        /* background-color: tomato; */
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
            // 요일 div
            border: 1px solid black;
            font-size: 18px;
            abbr {
                text-decoration: none !important;
            }
        }
    }
    .react-calendar__tile {
        border: 1px solid black;
        /* background-color: tomato; */
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

function ScheduleCalendar() {
    const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);

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
                tileContent={({ date, view }) => {
                    return <ReservationDiv>n건의 예약이 있습니다.</ReservationDiv>;
                }}
            />
        </>
    );
}

export default ScheduleCalendar;
