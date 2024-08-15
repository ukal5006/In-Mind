import React, { useState } from 'react';
import Btn from '../../components/Btn';
import styled from 'styled-components';
import axios from 'axios';
import { RUDRESERVE } from '../../apis/reserveApi';
import userStore from '../../stores/userStore';
import useChildStore from '../../stores/childStore';
import { useNavigate } from 'react-router-dom';

interface TimeRange {
    startTime: string;
    endTime: string;
}

interface ReservationTimeProps {
    date: string;
    ableTime: any;
    unableTime: any;
}

interface IChild {
    childBirth: string;
    childIdx: number;
    childName: string;
}

const TimeTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 420px;
    flex-direction: column;
`;

const ChildrenDiv = styled.div`
    margin-top: 0px;
    display: flex;
    flex-wrap: wrap;
`;
const BtnDiv = styled.div`
    display: flex;
`;

const ReserveBtn = styled(Btn)`
    color: white;
`;

const ReservationTime: React.FC<ReservationTimeProps> = ({ date, ableTime, unableTime }) => {
    const navigate = useNavigate();
    const { userInfo } = userStore((state) => state);
    const { children } = useChildStore((state) => state);
    const timeButtons: number[] = [];

    const timeToNumber = (time: string) => {
        return Number(time.substring(0, 2));
    };

    const numberToTime = (num: number) => {
        return String(num).padStart(2, '0');
    };

    const availableStartTime = timeToNumber(ableTime.availableTimeStartTime);
    const availableEndTime = timeToNumber(ableTime.availableTimeEndTime);

    for (let i = availableStartTime; i < availableEndTime; i++) {
        timeButtons.push(i);
    }

    const disabledTimes = unableTime.reduce((acc: Set<number>, range: TimeRange) => {
        const start = timeToNumber(range.startTime);
        const end = timeToNumber(range.endTime);
        for (let i = start; i < end; i++) {
            acc.add(i);
        }
        return acc;
    }, new Set<number>());

    const [selectedTime, setSelectedTime] = useState(0);
    const [selectedChild, setSelectedChild] = useState<IChild | null>(null);
    const { token } = userStore((state) => state);

    const handleClickTime = (value: number) => {
        if (!disabledTimes.has(value)) {
            setSelectedTime(value);
        }
    };

    const handleChildSelect = (child: IChild) => {
        setSelectedChild(child);
    };

    const handleReserve = () => {
        if (!selectedChild) {
            alert('자녀를 선택해주세요.');
            return;
        }

        axios
            .post(
                RUDRESERVE,
                {
                    userIdx: userInfo?.userIdx,
                    coIdx: ableTime.userIdx,
                    childIdx: selectedChild.childIdx,
                    reserveInfoDate: date,
                    reserveInfoStartTime: `${selectedTime.toString().padStart(2, '0')}:00`,
                    reserveInfoEndTime: `${(selectedTime + 1).toString().padStart(2, '0')}:00`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            )
            .then((response) => {
                console.log('예약이 완료되었습니다:', response.data);
                navigate('/user/reservationHistory');
            })
            .catch((error) => {
                console.error('예약 중 오류 발생:', error);
            });
    };

    return (
        <TimeTable>
            <BtnDiv>
                {timeButtons.map((time) => (
                    <Btn
                        key={time}
                        style={{
                            width: '50px',
                            margin: '5px',
                            padding: '5px',
                            fontSize: '15px',
                            backgroundColor: disabledTimes.has(time)
                                ? '#ccc'
                                : selectedTime === time
                                ? '#10c263' // 선택된 시간일 경우 녹색
                                : '#007bff', // 기본 녹색으로 설정 (비활성화된 시간은 회색)
                            color: disabledTimes.has(time) ? '#666' : '#fff',
                            cursor: disabledTimes.has(time) ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => handleClickTime(time)} // 클릭 핸들러
                    >
                        {numberToTime(time)}:00
                    </Btn>
                ))}
            </BtnDiv>
            <ChildrenDiv>
                {children.map((child: IChild) => (
                    <Btn
                        key={child.childIdx}
                        style={{
                            margin: '5px',
                            padding: '5px',
                            fontSize: '15px',
                            backgroundColor: selectedChild?.childIdx === child.childIdx ? '#10c263' : '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleChildSelect(child)}
                    >
                        {child.childName}
                    </Btn>
                ))}
            </ChildrenDiv>
            <ReserveBtn onClick={handleReserve}>예약하기</ReserveBtn>
        </TimeTable>
    );
};

export default ReservationTime;
