import styled from 'styled-components';
import Container from '../../../components/Container';
import Text from '../../../components/Text';
import { colors } from '../../../theme/colors';
import Wrapper from '../../../components/Wrapper';
import Btn from '../../../components/Btn';
import { ReservationInfo } from '.';
import { useState } from 'react';
import axios from 'axios';
import { DELETERESERVE, RUDRESERVE } from '../../../apis/reserveApi';
import { useNavigate } from 'react-router-dom';
import userStore from '../../../stores/userStore';
import { FacialContainer, FacialInfo } from '../../UserMain/UserHome/ReservationHistory';
import VideoRoomComponent from '../../FacialMeeting/components/VideoRoomComponent';
import { READREPORTS } from '../../../apis/reportsApi';
import { TbReportAnalytics } from 'react-icons/tb';
import { FaPowerOff } from 'react-icons/fa';

interface ScheduleCalendarProps {
    reservationList: ReservationInfo[] | undefined;
    selectedDate: string | null;
}

const TitleContainer = styled(Container)`
    padding: 10px 0px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    position: fixed;
    height: 40px;
    width: 299px;
    border-bottom: 1px solid black;
`;
const Title = styled(Text)`
    height: 100%;
    margin: 0px 20px;
    font-weight: 700;
`;
const TitleBtn = styled(Text)`
    height: 100%;
    font-size: 14px;
    font-weight: 700;
    padding: 5px;
    background: rgba(255, 255, 255, 0.2); /* 반투명 흰색 배경 */
    border-radius: 10px; /* 모서리 둥글게 */
    backdrop-filter: blur(10px); /* 배경 블러 처리 */
    -webkit-backdrop-filter: blur(10px); /* 사파리 지원을 위한 처리 */
    border: 1px solid rgba(255, 255, 255, 0.3); /* 테두리 */
`;
const List = styled.ul`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;
const Item = styled.li`
    border-radius: 10px;
    width: 280px;
    height: 150px;
    margin-bottom: 10px;
    padding: 10px 15px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.2); /* 반투명 흰색 배경 */
    border-radius: 15px; /* 모서리 둥글게 */
    backdrop-filter: blur(10px); /* 배경 블러 처리 */
    -webkit-backdrop-filter: blur(10px); /* 사파리 지원을 위한 처리 */
    border: 1px solid rgba(255, 255, 255, 0.3); /* 테두리 */
`;

const Detail = styled(Text)`
    justify-content: flex-end;
    font-size: 14px;
    color: ${colors.gray};
    margin-bottom: 10px;
    cursor: pointer;
`;
const DateText = styled(Text)`
    font-weight: 700;
    margin-bottom: 10px;
    justify-content: flex-start;
`;
const ChildName = styled(Text)`
    font-weight: 700;
    margin-bottom: 10px;
    justify-content: flex-start;
`;
const Time = styled(Text)`
    margin-bottom: 10px;
    color: ${colors.darkGray};
    justify-content: flex-start;
`;
const BtnWrapper = styled(Wrapper)`
    width: 100%;
    justify-content: flex-end;
    padding: 0px;
`;
const RoomBtn = styled(Btn)`
    height: 30px;
    background-color: ${colors.green};
    color: ${colors.white};
    font-size: 15px;
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

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
`;

const BtnContainer = styled.div`
    position: fixed;
    z-index: 999999;
    top: 46px;
    right: 570px;
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

const ReportContainer = styled.div`
    position: fixed;
    left: 0;
    /* width: 300px; */
    background-color: white;
`;

const ImgContainer = styled.div`
    display: flex;
`;

const ImgTP = styled.img`
    width: 300px;
    height: 500px;
`;
const ImgH = styled.img`
    width: 500px;
    height: 300px;
`;

const BtnDiv = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    & > button {
        color: white;
    }
    align-items: center;
`;

function ReservationList({ reservationList, selectedDate }: ScheduleCalendarProps) {
    const filteredReservations = reservationList
        ?.filter((reservation) => reservation.reserveInfoDate === selectedDate)
        .sort((a: any, b: any) => {
            const dateA = new Date(a.reserveInfoDate + ' ' + a.reserveInfoStartTime);
            const dateB = new Date(b.reserveInfoDate + ' ' + b.reserveInfoStartTime);
            return dateA.getTime() - dateB.getTime();
        });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<any>(null);
    const navigate = useNavigate();
    const { userInfo, token } = userStore((state) => state);
    const [reportOpen, setReportOpen] = useState(false);
    // const filteredReservations = reservations.filter(reservation => reservation.reserveInfoDate === targetDate);

    const handleReport = () => {
        setReportOpen(true);
    };

    const handleDetailClick = (reservation: ReservationInfo) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReservation(null);
    };

    const handleCancelReservation = (id: any) => {
        axios
            .delete(`${DELETERESERVE(id)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then(() => {
                alert('예약이 취소되었습니다.');
                handleCloseModal();
                navigate('/counselor');
            });
    };

    const [isFacial, setIsFacial] = useState(false);
    const [facialInfo, setFacialInfo] = useState<FacialInfo | null>();
    const [report, setReport] = useState<any>();

    const handleFacial = (facialInfo: FacialInfo) => {
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

    return (
        <>
            <TitleContainer>
                <Title>상담 예약 내역</Title>
            </TitleContainer>
            <List>
                {filteredReservations?.length === 0 ? (
                    <>예약내역이 없습니다</>
                ) : (
                    filteredReservations?.map((reservation: any) => (
                        <Item key={reservation.id}>
                            <Detail onClick={() => handleDetailClick(reservation)}>자세히 보기</Detail>
                            <DateText>{reservation.reserveInfoDate}</DateText>
                            <ChildName>{reservation.childName}</ChildName>
                            <Time>
                                {reservation.reserveInfoStartTime.substring(0, 5)} ~{' '}
                                {reservation.reserveInfoEndTime.substring(0, 5)}
                            </Time>
                            <BtnWrapper>
                                <RoomBtn
                                    onClick={() =>
                                        handleFacial({
                                            childName: reservation.childName,
                                            reserveInfoIdx: reservation.reserveInfoIdx,
                                            reportIdx: reservation.reportIdx,
                                            coIdx: reservation.coIdx,
                                        })
                                    }
                                >
                                    방 만들기
                                </RoomBtn>
                            </BtnWrapper>
                        </Item>
                    ))
                )}
            </List>

            {isModalOpen && (
                <ModalBackground>
                    <ModalContent>
                        <Title>예약 내역</Title>
                        {selectedReservation && (
                            <>
                                <p>예약번호: {selectedReservation?.reserveInfoIdx}</p>
                                <p>어린이: {selectedReservation?.childName}</p>
                                <p>날짜: {selectedReservation?.reserveInfoDate}</p>
                                <p>
                                    시간: {selectedReservation.reserveInfoStartTime} ~{' '}
                                    {selectedReservation.reserveInfoEndTime}
                                </p>
                            </>
                        )}
                        <BtnDiv>
                            <button onClick={() => handleCancelReservation(selectedReservation?.reserveInfoIdx)}>
                                예약 취소
                            </button>
                            <button style={{ backgroundColor: 'tomato' }} onClick={handleCloseModal}>
                                닫기
                            </button>
                        </BtnDiv>
                    </ModalContent>
                </ModalBackground>
            )}

            {isFacial && (
                <ModalBackground>
                    <FacialContainer>
                        <VideoRoomComponent
                            userName={userInfo?.userName}
                            role={userInfo?.userRole}
                            childName={facialInfo?.childName}
                            reserveInfoIdx={facialInfo?.reserveInfoIdx}
                            reportIdx={facialInfo?.reportIdx}
                            report={report}
                        />
                    </FacialContainer>
                    <BtnContainer>
                        <ReportBtn onClick={handleReport}>
                            <TbReportAnalytics />
                        </ReportBtn>
                        <ExitBtn
                            onClick={() => {
                                setIsFacial(false);
                                setReportOpen(false);
                                setFacialInfo(null);
                            }}
                        >
                            <FaPowerOff />
                        </ExitBtn>
                    </BtnContainer>
                </ModalBackground>
            )}

            {reportOpen && (
                <ReportContainer>
                    <Btn onClick={() => setReportOpen(false)}>닫기</Btn>
                    <div>
                        <div>{report.objectResult}</div>
                        <div>{report.reportResult}</div>
                    </div>
                    <ImgContainer>
                        <ImgH src={report.houseImage} />
                        <ImgTP src={report.treeImage} />
                        <ImgTP src={report.personImage} />
                    </ImgContainer>
                </ReportContainer>
            )}
        </>
    );
}

export default ReservationList;
