import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';
import ContainerTop from '../../../components/ContainerTop';
import ContainerTopTitle from '../../../components/ContainerTopTitle';
import ContainerTopLink from '../../../components/ContainerTopLink';
import { FaPlus } from 'react-icons/fa';
import ActiveBtn from '../../../components/ActiveBtn';
// import reservationStore from '../../../stores/reservationStore';
import userStore from '../../../stores/userStore';
import axios from 'axios';
import { READRESERVEALL } from '../../../apis/reserveApi';
import VideoRoomComponent from '../../FacialMeeting/components/VideoRoomComponent';
import Btn from '../../../components/Btn';
import { READREPORTS } from '../../../apis/reportsApi';

interface reservationInfo {
    reserveInfoIdx: number;
    coName: string;
    reportIdx: number;
    childName: string;
    reserveInfoDate: string;
    reserveInfoStartTime: string;
    reserveInfoEndTime: string;
    reserveInfoCreateTime: string;
    isEnd: "Y" | "N";
}

export interface FacialInfo {
    childName: string;
    reserveInfoIdx: number;
    reportIdx: number;
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

export const FacialContainer = styled.div`
    position: relative;
    width: 90vw;
    height: 90vh;
`;

function ReservationHistory() {
    const { userInfo, token } = userStore();
    const [reservationHistory, setReservationHistory] = useState<reservationInfo[]>([]); // 타입 명시
    const [isFacial, setIsFacial] = useState(false);
    const [facialInfo, setFacialInfo] = useState<FacialInfo | null>();
    const [report, setReport] = useState<any>();

    const handleFacial = (facialInfo: FacialInfo) => {
        setFacialInfo(facialInfo);
        axios
            .get(READREPORTS(facialInfo.reportIdx, userInfo?.userIdx), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "*/*",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then((response) => setReport(response.data))
            .then(() => setIsFacial(true));
    };

    useEffect(() => {
        if (userInfo?.userIdx) {
            axios
                .get(READRESERVEALL(userInfo?.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: "*/*",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                .then((response) => setReservationHistory(response.data));
            // .then((response) => console.log(response.data));
        }
    }, [userInfo, token]);

    // isEnd가 'N'인 예약 내역만 필터링
    const filteredReservationHistory = reservationHistory.filter((e) => e.isEnd === "N");

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
                                        <ActiveBtn
                                            onClick={() =>
                                                handleFacial({
                                                    childName: e.childName,
                                                    reserveInfoIdx: e.reserveInfoIdx,
                                                    reportIdx: e.reportIdx,
                                                })
                                            }
                                        >
                                            입장하기
                                        </ActiveBtn>
                                    </ReservationHistoryItem>
                                </ReservationHistoryList>
                            );
                        })
                    ) : (
                        <>예약 없음</>
                    )}
                </>
            </ReservationHistoryWrapper>
            {isFacial && (
                <ModalBackground>
                    <FacialContainer>
                        <VideoRoomComponent
                            userName={userInfo?.userName}
                            childName={facialInfo?.childName}
                            reserveInfoIdx={facialInfo?.reserveInfoIdx}
                            reportIdx={facialInfo?.reportIdx}
                            role={userInfo?.userRole}
                        />
                    </FacialContainer>
                    <Btn
                        onClick={() => {
                            setIsFacial(false);
                            setFacialInfo(null);
                        }}
                    >
                        닫기
                    </Btn>
                </ModalBackground>
            )}
        </ReservationHistoryContainer>
    );
}

export default ReservationHistory;
