import React from 'react';
import styled from "styled-components";
import Container from "../../../components/Container";
import Wrapper from "../../../components/Wrapper";
import ContainerTop from "../../../components/ContainerTop";
import ContainerTopTitle from "../../../components/ContainerTopTitle";
import ContainerTopLink from "../../../components/ContainerTopLink";
import { FaPlus } from "react-icons/fa";
import ActiveBtn from "../../../components/ActiveBtn";
import reservationStore from "../../../stores/reservationStore";

interface Reservation {
  reserveInfoIdx: number;
  coName: string;
  reserveInfoDate: string;
  reserveInfoStartTime: ReserveTime;
  reserveInfoEndTime: ReserveTime;
}

interface ReserveTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
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

const ReservationHistory: React.FC = () => {
  const reservationList = reservationStore(state => state.reservationList);

  return (
    <ReservationHistoryContainer>
      <ReservationHistoryWrapper>
        <ContainerTop>
          <ContainerTopTitle>상담 예약 내역</ContainerTopTitle>
          <ContainerTopLink to="/user/reservationHistory">
            <FaPlus />
          </ContainerTopLink>
        </ContainerTop>
        {reservationList && reservationList.length > 0 ? (
          <>
            {reservationList.map((e: Reservation) => (
              <ReservationHistoryList key={e.reserveInfoIdx}>
                <ReservationHistoryItem>
                  {e.reserveInfoDate} {e.reserveInfoStartTime.hour}
                </ReservationHistoryItem>
                <ReservationHistoryItem>
                  {e.coName} 상담가님
                </ReservationHistoryItem>
                <ReservationHistoryItem>{e.coName}</ReservationHistoryItem>
                <ReservationHistoryItem>
                  <ActiveBtn>입장하기</ActiveBtn>
                </ReservationHistoryItem>
              </ReservationHistoryList>
            ))}
          </>
        ) : (
          <div>No Reservation...</div>
        )}
      </ReservationHistoryWrapper>
    </ReservationHistoryContainer>
  );
};

export default ReservationHistory;