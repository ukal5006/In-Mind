import React, { useState } from 'react';
import Btn from '../../components/Btn';
import styled from 'styled-components';
import axios from 'axios';
import { RUDRESERVE } from '../../apis/reserveApi';
import userStore from '../../stores/userStore';
import useChildStore from '../../stores/childStore';
import { useNavigate } from 'react-router-dom';

interface TimeRange {
    startTime: string; // 예: "15:00"
    endTime: string; // 예: "15:00"
}

interface ReservationTimeProps {
    date: string; // 적절한 타입으로 수정
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
`;

const ChildrenDiv = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const ReservationTime: React.FC<ReservationTimeProps> = ({ date, ableTime, unableTime }) => {
    const navigate = useNavigate();
    const { userInfo } = userStore((state) => state);
    const { children } = useChildStore((state) => state);
    const timeButtons: number[] = [];

    // 시간을 숫자로 변환하는 함수 (문자열 "HH:MM"에서 "HH"만 추출)
    const timeToNumber = (time: string) => {
        return Number(time.substring(0, 2)); // 앞의 두 글자(시간)만 숫자로 변환
    };

    // 숫자를 시간 문자열로 변환하는 함수
    const numberToTime = (num: number) => {
        return String(num).padStart(2, '0'); // "HH" 형식으로 변환
    };

    const availableStartTime = timeToNumber(ableTime.availableTimeStartTime);
    const availableEndTime = timeToNumber(ableTime.availableTimeEndTime);

    // 가능한 시간 버튼 생성
    for (let i = availableStartTime; i < availableEndTime; i++) {
        timeButtons.push(i);
    }

    // 비활성화 시간 리스트 생성
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

        console.log();

        axios
            .post(
                RUDRESERVE,
                {
                    userIdx: userInfo?.userIdx,
                    coIdx: ableTime.userIdx,
                    childIdx: selectedChild.childIdx,
                    reserveInfoDate: date,
                    reserveInfoStartTime: `${selectedTime.toString().padStart(2, '0')}:00`,
                    reserveInfoEndTime: `${(selectedTime + 1).toString().padStart(2, '0')}:00`, // 예약 시간의 끝
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
                // 예약 성공 시 처리
                console.log('예약이 완료되었습니다:', response.data);
                navigate('/user/reservationHistory');
            })
            .catch((error) => {
                // 오류 처리
                console.error('예약 중 오류 발생:', error);
            });
    };

    return (
        <TimeTable>
            {timeButtons.map((time) => (
                <Btn
                    key={time}
                    style={{
                        width: '50px',
                        margin: '5px',
                        padding: '8px',
                        fontSize: '15px',
                        backgroundColor: disabledTimes.has(time) ? '#ccc' : '#10c263',
                        color: disabledTimes.has(time) ? '#666' : '#fff',
                        cursor: disabledTimes.has(time) ? 'not-allowed' : 'pointer', // 커서 스타일 추가
                    }}
                    onClick={() => handleClickTime(time)} // 클릭 핸들러
                >
                    {numberToTime(time)}:00 {/* 시간 문자열로 표시, 분은 00으로 고정 */}
                </Btn>
            ))}
            <ChildrenDiv>
                {children.map((child: IChild) => (
                    <Btn
                        key={child.childIdx}
                        style={{
                            margin: '5px',
                            padding: '8px',
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
            <Btn onClick={handleReserve}>예약하기</Btn>
        </TimeTable>
    );
};

export default ReservationTime;
