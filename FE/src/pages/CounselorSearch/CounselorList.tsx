import React, { useEffect, useState } from 'react';
import useCounselorStore, { Counselor } from '../../stores/counselorStore';
import styled from 'styled-components';
import Text from '../../components/Text';
import Btn from '../../components/Btn';
import Container from '../../components/Container';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment';
import axios from 'axios';
import { RDDEFAULTTIME, READUNAVAILABLETIME } from '../../apis/managementApi';
import ReservationTime from './ReservationTime';
import userStore from '../../stores/userStore';
import Glass from '../../components/Glass';
import Reviews from '../../components/Reviews';

interface DateSet {
    date: any;
}

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CounselorDetail = styled.div`
    border-radius: 10px;
    width: 700px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* position: relative 설정을 통해 닫기 버튼의 위치를 조정 */
`;

const CloseBtn = styled(Btn)`
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

const Title = styled(Text)`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`;

const Profile = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ddd;
    margin-bottom: 10px;
`;

const Name = styled(Text)`
    font-size: 22px;
    font-weight: 700;
    color: black;
`;

const RBtn = styled(Btn)`
    color: white;
`;

const TextStyled = styled(Text)`
    font-size: 16px;
    color: black;
    margin: 4px 0;
`;

const ReviewContainer = styled.div`
    width: 100%;
    text-align: left;
    margin: 10px 0px;
    height: 380px;
`;

const Reservation = styled.div`
    border-radius: 10px;
    width: 450px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Card = styled.div`
    width: 600px;
    padding: 20px;
    margin: 10px auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    ${Glass}

    &:hover {
        transform: translateY(-5px);
    }
`;

const ItemWrapper = styled.div`
    flex: 1;
`;

const ProfileSmall = styled(Profile)`
    width: 100px;
    height: 100px;
`;

const CounselorList: React.FC = () => {
    const { counselors } = useCounselorStore();
    const [detail, setDetail] = useState<Counselor>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReserve, setIsReserve] = useState(false);
    const [availableTimes, setAvailableTimes] = useState();
    const [ableTime, setAbleTime] = useState();
    const { token } = userStore((state) => state);

    const handleDetail = (counselor: Counselor) => {
        setDetail(counselor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsReserve(false);
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    useEffect(() => {
        if (detail && selectedDate) {
            axios
                .get(READUNAVAILABLETIME(detail?.userIdx, moment(selectedDate).format('YYYY-MM-DD')), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => setAvailableTimes(response.data));
        }
    }, [selectedDate, detail]);

    const tileClassName = ({ date }: DateSet) => {
        const today = new Date();
        if (date < today) {
            return 'disabled-date';
        }
        if (date.getDay() === 0 || date.getDay() === 6) {
            return 'weekend-date';
        }
        return '';
    };

    return (
        <div>
            {counselors.map((counselor) => (
                <Card
                    key={counselor.userIdx}
                    onClick={() => {
                        handleDetail(counselor);
                        axios
                            .get(RDDEFAULTTIME(counselor.userIdx), {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    accept: '*/*',
                                    'Content-Type': 'application/json;charset=UTF-8',
                                },
                            })
                            .then((response) => setAbleTime(response.data));
                    }}
                >
                    <ProfileSmall />
                    <ItemWrapper>
                        <Name>{counselor.name}</Name>
                        <TextStyled>{counselor.intro}</TextStyled>
                        <TextStyled>{counselor.tel}</TextStyled>
                        {/* <TextStyled>{counselor.organizationName} 소속</TextStyled> */}
                        <TextStyled>
                            {counselor.organizationName ? counselor.organizationName + '소속' : '프리랜서'}
                        </TextStyled>
                        <TextStyled>{counselor.organizationTel}</TextStyled>
                        <TextStyled>리뷰 평점 : {counselor.reviewAverage}/5</TextStyled>
                        <TextStyled>{counselor.reviewCount}개의 리뷰</TextStyled>
                    </ItemWrapper>
                </Card>
            ))}
            {isModalOpen && (
                <ModalBackground>
                    <CounselorDetail>
                        <CloseBtn onClick={handleCloseModal}>닫기</CloseBtn> {/* 닫기 버튼 위치 조정 */}
                        <Title>상담사 자세히 보기</Title>
                        <Profile />
                        <Name>{detail?.name}</Name>
                        <TextStyled>{detail?.intro}</TextStyled>
                        <TextStyled>{detail?.tel}</TextStyled>
                        {detail?.organizationName && <TextStyled>{detail?.organizationName} 기관소속</TextStyled>}
                        {detail?.organizationTel && <TextStyled> 기관번호 : {detail?.organizationTel}</TextStyled>}
                        {/* <TextStyled>리뷰 평점 : {detail?.reviewAverage}/5</TextStyled>
                        <TextStyled>{detail?.reviewCount}개의 리뷰</TextStyled>
                        <TextStyled>상담사 ID: {detail?.userIdx}</TextStyled>
                        <ReviewContainer>리뷰 칸</ReviewContainer> */}
                        <ReviewContainer>
                            <Reviews counselorIdx={detail?.userIdx} />
                        </ReviewContainer>
                        <RBtn onClick={() => setIsReserve(true)}>예약하기</RBtn>
                    </CounselorDetail>

                    {isReserve && (
                        <Reservation>
                            <Calendar
                                onChange={(date) => setSelectedDate(date as Date | null)}
                                value={selectedDate}
                                calendarType="gregory"
                                view="month"
                                next2Label={null}
                                prev2Label={null}
                                minDetail="year"
                                formatDay={(locale, date) => moment(date).format('D')}
                                formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
                                formatYear={(locale, date) => moment(date).format('YYYY')}
                                locale="kr"
                                minDate={new Date()}
                                tileClassName={tileClassName}
                            />
                            <ReservationTime
                                date={moment(selectedDate).format('YYYY-MM-DD')}
                                ableTime={ableTime}
                                unableTime={availableTimes}
                            />
                        </Reservation>
                    )}
                </ModalBackground>
            )}
        </div>
    );
};

export default CounselorList;
