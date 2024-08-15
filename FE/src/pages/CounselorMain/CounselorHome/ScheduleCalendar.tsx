import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';
import { ReservationInfo } from '.';
import Glass from '../../../components/Glass';

export type DatePiece = any | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface ScheduleCalendarProps {
    reservationList: ReservationInfo[] | undefined;
    onDateSelect: (dates: (string | null)[]) => void;
}

const CustomCalendar = styled(Calendar)`
    padding: 10px 20px;
    ${Glass}
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

const Count = styled.div`
    background-color: #55b9f1;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
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
            onDateSelect(formattedDate);
        } else {
            formattedDate = selectedDate ? [moment(selectedDate).format('YYYY-MM-DD')] : [null];
            onDateSelect(formattedDate);
        }
    }, [selectedDate]);

    // 예약 건수를 날짜별로 맵핑
    const reservationCountByDate = reservationList?.reduce((acc, reservation) => {
        const date = moment(reservation.reserveInfoDate).format('YYYY-MM-DD'); // reserveInfoDate를 사용하여 날짜 형식 맞추기
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
                next2Label={null}
                prev2Label={null}
                minDetail="year"
                formatDay={(locale, date) => moment(date).format('D')}
                formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
                formatYear={(locale, date) => moment(date).format('YYYY')}
                locale="kr"
                tileContent={({ date }) => {
                    const formattedDate = moment(date).format('YYYY-MM-DD');
                    const count = reservationCountByDate?.[formattedDate] || 0;
                    return (
                        <ReservationDiv>
                            {count > 0 && <Count>{count}</Count>}
                            {moment(date).isBefore(moment(), 'day') && <Checkmark>✔️</Checkmark>}
                        </ReservationDiv>
                    );
                }}
            />
        </>
    );
}

export default ScheduleCalendar;
