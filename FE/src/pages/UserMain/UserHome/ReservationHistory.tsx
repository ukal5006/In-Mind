import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';
import ContainerTop from '../../../components/ContainerTop';
import ContainerTopTitle from '../../../components/ContainerTopTitle';
import ContainerTopLink from '../../../components/ContainerTopLink';
import { FaPlus } from 'react-icons/fa';
import ActiveBtn from '../../../components/ActiveBtn';
import reservationStore from '../../../stores/reservationStore';
import userStore from '../../../stores/userStore';
import axios from 'axios';
import { READRESERVEALL } from '../../../apis/reserveApi';

interface reservationInfo {
    reserveInfoIdx: number;
    coName: string;
    reportIdx: number;
    childName: string;
    reserveInfoDate: string;
    reserveInfoStartTime: string;
    reserveInfoEndTime: string;
    reserveInfoCreateTime: string;
    isEnd: 'Y' | 'N';
}

const ReservationHistoryContainer = styled(Container)`
    width: 100%;
    height: 50%;
`;

const ReservationHistoryWrapper = styled(Wrapper)`
    width: 90%;
    height: 70%;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    flex-direction: column;
    justify-content: space-between;
`;

const ReservationHistoryList = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;

const ReservationHistoryItem = styled.div`
    /* font-size: 19px; */
    /* font-weight: 700; */
`;

function ReservationHistory() {
    const { userInfo, token } = userStore();
    const [reservationHistory, setReservationHistory] = useState<reservationInfo[]>([]); // 타입 명시

    useEffect(() => {
        if (userInfo?.userIdx) {
            axios
                .get(READRESERVEALL(userInfo?.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => setReservationHistory(response.data));
        }
    }, [userInfo, token]);

    // isEnd가 'N'인 예약 내역만 필터링
    const filteredReservationHistory = reservationHistory.filter((e) => e.isEnd === 'N');

    return (
        <ReservationHistoryContainer>
            <ReservationHistoryWrapper>
                <ContainerTop>
                    <ContainerTopTitle>상담 예약 내역</ContainerTopTitle>
                    <ContainerTopLink to="/user/reservationHistory">
                        <FaPlus />
                    </ContainerTopLink>
                </ContainerTop>
                <>
                    {filteredReservationHistory.length > 0 ? (
                        filteredReservationHistory.map((e: reservationInfo) => {
                            return (
                                <ReservationHistoryList key={e.reserveInfoIdx}>
                                    <ReservationHistoryItem>
                                        {e.reserveInfoDate} {e.reserveInfoStartTime} {e.reserveInfoEndTime}
                                    </ReservationHistoryItem>
                                    <ReservationHistoryItem>{e.coName} 상담가님</ReservationHistoryItem>
                                    <ReservationHistoryItem>{e.childName} 어린이</ReservationHistoryItem>
                                    <ReservationHistoryItem>
                                        <ActiveBtn>입장하기</ActiveBtn>
                                    </ReservationHistoryItem>
                                </ReservationHistoryList>
                            );
                        })
                    ) : (
                        <>예약 없음</>
                    )}
                </>
            </ReservationHistoryWrapper>
        </ReservationHistoryContainer>
    );
}

export default ReservationHistory;
