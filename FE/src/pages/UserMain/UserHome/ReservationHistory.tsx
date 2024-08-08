import styled from "styled-components";
import Container from "../../../components/Container";
import Wrapper from "../../../components/Wrapper";
import reservationHistoryInfo from "../../../testData/reservationHistoryInfo";
import ContainerTop from "../../../components/ContainerTop";
import ContainerTopTitle from "../../../components/ContainerTopTitle";
import ContainerTopLink from "../../../components/ContainerTopLink";
import { FaPlus } from "react-icons/fa";
import ActiveBtn from "../../../components/ActiveBtn";

interface reservationInfo {
  date: string;
  time: string;
  counselor: string;
  name: string;
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
          {reservationHistoryInfo.map((e: reservationInfo) => {
            return (
              <ReservationHistoryList>
                <ReservationHistoryItem>
                  {e.date} {e.time}
                </ReservationHistoryItem>
                <ReservationHistoryItem>
                  {e.counselor} 상담가님
                </ReservationHistoryItem>
                <ReservationHistoryItem>{e.name}</ReservationHistoryItem>
                <ReservationHistoryItem>
                  <ActiveBtn>입장하기</ActiveBtn>
                </ReservationHistoryItem>
              </ReservationHistoryList>
            );
          })}
        </>
      </ReservationHistoryWrapper>
    </ReservationHistoryContainer>
  );
}

export default ReservationHistory;
