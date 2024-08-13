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
    background-color: white;
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
`;
const List = styled.ul`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`;
const Item = styled.li`
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    width: 280px;
    height: 150px;
    margin-bottom: 10px;
    padding: 10px 15px;
    box-sizing: border-box;
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

const CancelBtn = styled(Btn)`
    margin-top: 10px;
`;

function ReservationList({ reservationList, selectedDate }: ScheduleCalendarProps) {
    console.log(selectedDate);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<any>(null);
    const navigate = useNavigate();
    const { userInfo, token } = userStore((state) => state);

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

    const currentDateTime = new Date();

    // 현재 날짜와 시간 이후의 예약만 필터링하고 시간순으로 정렬
    const filteredReservations = reservationList
        ?.filter((reservation: any) => {
            const reservationDateTime = new Date(reservation.reserveInfoDate + ' ' + reservation.reserveInfoStartTime);
            return reservationDateTime > currentDateTime;
        })
        .sort((a: any, b: any) => {
            const dateA = new Date(a.reserveInfoDate + ' ' + a.reserveInfoStartTime);
            const dateB = new Date(b.reserveInfoDate + ' ' + b.reserveInfoStartTime);
            return dateA.getTime() - dateB.getTime();
        });

    const [isFacial, setIsFacial] = useState(false);
    const [facialInfo, setFacialInfo] = useState<FacialInfo | null>();
    const handleFacial = (facialInfo: FacialInfo) => {
        setFacialInfo(facialInfo);
        setIsFacial(true);
    };
    return (
        <>
            <TitleContainer>
                <TitleBtn>오늘</TitleBtn>
                <Title>상담 예약 내역</Title>
                <TitleBtn>전체</TitleBtn>
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
                        <CancelBtn onClick={() => handleCancelReservation(selectedReservation?.reserveInfoIdx)}>
                            예약 취소
                        </CancelBtn>
                        <Btn onClick={handleCloseModal}>닫기</Btn>
                    </ModalContent>
                </ModalBackground>
            )}

            {isFacial && (
                <ModalBackground>
                    <FacialContainer>
                        <VideoRoomComponent
                            userName={userInfo?.userName}
                            childName={facialInfo?.childName}
                            reserveInfoIdx={facialInfo?.reserveInfoIdx}
                            reportIdx={facialInfo?.reportIdx}
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
        </>
    );
}

export default ReservationList;
