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

interface reservationInfo {
    reserveInfoIdx: number;
    coName: string;
    reportIdx: number;
    childName: string;
    reserveInfoDate: string;
    reserveInfoStartTime: string;
    reserveInfoEndTime: string;
    reserveInfoCreateTime: string;
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
    const [reservationHistory, setReservationHistory] = useState([]);

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
                .then(() => console.log(reservationHistory));
        }
    }, [userInfo, token]);

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
                    {reservationHistory.length > 0 ? (
                        reservationHistory.map((e: reservationInfo) => {
                            return (
                                <ReservationHistoryList>
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
