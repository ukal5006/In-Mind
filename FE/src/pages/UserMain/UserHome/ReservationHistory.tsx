import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../../components/Container';
import Wrapper from '../../../components/Wrapper';
import ContainerTop from '../../../components/ContainerTop';
import ContainerTopTitle from '../../../components/ContainerTopTitle';
import ContainerTopLink from '../../../components/ContainerTopLink';
import { FaPlus, FaPowerOff } from 'react-icons/fa';
import ActiveBtn from '../../../components/ActiveBtn';
import userStore from '../../../stores/userStore';
import axios from 'axios';
import { READRESERVEALL } from '../../../apis/reserveApi';
import VideoRoomComponent from '../../FacialMeeting/components/VideoRoomComponent';
import { READREPORTS } from '../../../apis/reportsApi';
import Glass from '../../../components/Glass';
import { TbReportAnalytics } from 'react-icons/tb';
import ReviewModal from '../../../components/ReviewModal';
import { CloseBtn, DetailTitle, ImgWrapper, ResultDiv } from './TestHistory';
import { IoClose } from 'react-icons/io5';

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
    coIdx: any;
}

export interface FacialInfo {
    childName: string;
    reserveInfoIdx: number;
    reportIdx: number;
    coIdx: any;
}

const ReservationHistoryContainer = styled(Container)`
    margin-top: 40px;
    width: 100%;
    height: 40%;
    ${Glass}
`;

const ReservationHistoryWrapper = styled(Wrapper)`
    width: 90%;
    height: 95%;
    border-radius: 10px;
    /* box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04); */
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: flex-start;
    overflow-y: scroll;
`;

const ReservationHistoryList = styled.div`
    width: 100%;
    /* height: 80px; */
    min-height: 65px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    margin-top: 20px;
    ${Glass}
`;

const ReservationHistoryItem = styled.div`
    /* font-size: 12px; */
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
    display: flex;
    justify-content: center;
    min-width: 700px;
`;

const ReportContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 700px;
    background-color: whitesmoke;
    position: relative;
    padding: 20px;
    align-items: center;
    border-radius: 10px;
    position: fixed;
`;
const BtnContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 200px;
    z-index: 9999999;
    display: flex;
    align-items: center;
`;
const ReportBtn = styled.div`
    font-size: 30px;
    color: white;
    margin-right: 10px;
    cursor: pointer;
`;

const ExitBtn = styled.div`
    font-size: 28px;
    color: tomato;
    cursor: pointer;
`;
const ImgContainer = styled.div`
    display: flex;
`;

function ReservationHistory() {
    const { userInfo, token } = userStore();
    const [reservationHistory, setReservationHistory] = useState<reservationInfo[]>([]); // 타입 명시
    const [isFacial, setIsFacial] = useState(false);
    const [facialInfo, setFacialInfo] = useState<FacialInfo | null>();
    const [report, setReport] = useState<any>();
    const [reportOpen, setReportOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const handleReport = () => {
        setReportOpen(true);
    };

    const handleFacial = (facialInfo: FacialInfo) => {
        console.log('여기서 페이셜 설정');
        console.log(facialInfo);
        setFacialInfo(facialInfo);
        axios
            .get(READREPORTS(facialInfo.reportIdx, userInfo?.userIdx), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
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
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => setReservationHistory(response.data))
                .catch((error) => {
                    console.log(error);
                });
            // .then((response) => console.log(response.data));
        }
    }, [userInfo, token]);

    // isEnd가 'N'인 예약 내역만 필터링
    const filteredReservationHistory = reservationHistory.filter((e) => e.isEnd === 'N');

    return (
        <>
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
                                            {e.reserveInfoDate} {e.reserveInfoStartTime.substring(0, 5)}
                                            {'~'}
                                            {e.reserveInfoEndTime.substring(0, 5)}
                                        </ReservationHistoryItem>
                                        <ReservationHistoryItem>{e.coName} 상담가님</ReservationHistoryItem>
                                        <ReservationHistoryItem>{e.childName}</ReservationHistoryItem>
                                        <ReservationHistoryItem>
                                            <ActiveBtn
                                                onClick={() => {
                                                    handleFacial({
                                                        childName: e.childName,
                                                        reserveInfoIdx: e.reserveInfoIdx,
                                                        reportIdx: e.reportIdx,
                                                        coIdx: e.coIdx,
                                                    });
                                                }}
                                            >
                                                입장
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
            </ReservationHistoryContainer>
            {isFacial && (
                <ModalBackground>
                    {!reviewOpen ? (
                        <>
                            <FacialContainer>
                                <BtnContainer>
                                    <ReportBtn onClick={handleReport}>
                                        <TbReportAnalytics />
                                    </ReportBtn>
                                    <ExitBtn
                                        onClick={() => {
                                            console.log('예약번호');
                                            console.log(facialInfo?.reserveInfoIdx);

                                            // eslint-disable-next-line no-restricted-globals
                                            const command = confirm('상담을 종료하시겠습니까?');
                                            if (command !== true) {
                                                return;
                                            }
                                            axios.put(
                                                'https://i11b301.p.ssafy.io/api/reserve',
                                                {
                                                    reserveInfoIdx: facialInfo?.reserveInfoIdx,
                                                },
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                        accept: '*/*',
                                                        'Content-Type': 'application/json;charset=UTF-8',
                                                    },
                                                }
                                            );
                                            setReportOpen(false);
                                            setReviewOpen(true);
                                        }}
                                    >
                                        <FaPowerOff />
                                    </ExitBtn>
                                </BtnContainer>
                                <VideoRoomComponent
                                    userName={userInfo?.userName}
                                    role={userInfo?.userRole}
                                    childName={facialInfo?.childName}
                                    reserveInfoIdx={facialInfo?.reserveInfoIdx}
                                    reportIdx={facialInfo?.reportIdx}
                                    report={report}
                                />
                            </FacialContainer>
                        </>
                    ) : (
                        <>
                            <ReviewModal reserveInfoIdx={facialInfo?.reserveInfoIdx} coIdx={facialInfo?.coIdx} />
                        </>
                    )}

                    {reportOpen && (
                        <ReportContainer>
                            <DetailTitle>검사 자세히보기</DetailTitle>
                            <ImgContainer>
                                <ImgWrapper src={report?.houseImage} />
                                <ImgWrapper src={report?.treeImage} />
                                <ImgWrapper src={report?.personImage} />
                            </ImgContainer>
                            {/* <ResultDiv>{report.objectResult}</ResultDiv> */}
                            <ResultDiv>{report.reportResult}</ResultDiv>
                            <CloseBtn onClick={() => setReportOpen(false)}>
                                <IoClose />
                            </CloseBtn>
                        </ReportContainer>
                    )}
                </ModalBackground>
            )}
        </>
    );
}

export default ReservationHistory;
