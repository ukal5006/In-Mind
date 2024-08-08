import styled from "styled-components";
import Container from "../../../components/Container";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import Wrapper from "../../../components/Wrapper";
import Btn from "../../../components/Btn";
import { ReservationInfo } from ".";

interface ScheduleCalendarProps {
  reservationList: ReservationInfo[] | undefined;
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
`;
const Date = styled(Text)`
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

function ReservationList({ reservationList }: ScheduleCalendarProps) {
  return (
    <>
      <TitleContainer>
        <TitleBtn>오늘</TitleBtn>
        <Title>상담 예약 내역</Title>
        <TitleBtn>전체</TitleBtn>
      </TitleContainer>
      <List>
        <Item>
          <Detail>자세히 보기</Detail>
          <Date>2024년8월17일</Date>
          <ChildName>김종원 어린이</ChildName>
          <Time>18:00 ~ 19:00</Time>
          <BtnWrapper>
            <RoomBtn>방 만들기</RoomBtn>
          </BtnWrapper>
        </Item>
        <Item>
          <Detail>자세히 보기</Detail>
          <Date>2024년8월17일</Date>
          <ChildName>김종원 어린이</ChildName>
          <Time>18:00 ~ 19:00</Time>
          <BtnWrapper>
            <RoomBtn>방 만들기</RoomBtn>
          </BtnWrapper>
        </Item>
      </List>
    </>
  );
}

export default ReservationList;
