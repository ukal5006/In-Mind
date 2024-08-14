import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBtn from './LoginBtn';
import OverviewContainer from './OverviewContainer';
import BigText from './BigText';
import SmallText from './SmallText';
import OnePageWrapper from './OnePageWrapper';
import Pagination from './Pagination';
import Dot from './Dot';
import BtnWrapper from './BtnWrapper';
import userStore from '../../stores/userStore';
import styled from 'styled-components';
import Text from '../../components/Text';
import { colors } from '../../theme/colors';

const TextCard = styled.div`
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 진하게 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    width: 300px;
    height: 60px;
`;

const TextPoint = styled(Text)`
    color: ${colors.okGreen};
    margin-left: 5px;
`;

const TextContainer = styled.div`
    width: 400px;
    display: flex;
    justify-content: space-evenly;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
`;

const TextEmo = styled.div`
    font-size: 70px;
    margin-bottom: 10px;
`;

const Overview: React.FC = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState<number>(0);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const { setToken, setUserInfo } = userStore();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('jwt');

        // 유저 정보가 있으면 자동 로그인
        if (userInfo && token) {
            const parsedUserInfo = JSON.parse(userInfo);
            setToken(token);
            setUserInfo(parsedUserInfo);
            console.log('토큰있음');

            // 역할에 따라 적절한 페이지로 이동
            if (parsedUserInfo.userRole === 'USER') {
                navigate('/user');
            } else {
                navigate('/counselor');
            }
        }
    }, [navigate, setToken, setUserInfo]);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            event.preventDefault(); // 기본 스크롤을 방지
            const delta = Math.sign(event.deltaY); // 스크롤 방향 감지
            const sections = document.querySelectorAll('.one-page'); // 각 페이지 섹션 선택
            const totalSections = sections.length;

            // 방향에 따라 섹션 이동
            if (delta > 0 && currentSection < totalSections - 1) {
                setCurrentSection((prev) => prev + 1);
                window.scrollTo({
                    top: (currentSection + 1) * window.innerHeight,
                    behavior: 'smooth',
                });
            } else if (delta < 0 && currentSection > 0) {
                setCurrentSection((prev) => prev - 1);
                window.scrollTo({
                    top: (currentSection - 1) * window.innerHeight,
                    behavior: 'smooth',
                });
            }
        };

        // 마우스 휠 이벤트 리스너 추가
        window.addEventListener('wheel', handleScroll, { passive: false });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [currentSection]);

    return (
        <OverviewContainer>
            <OnePageWrapper className="one-page" key={0}>
                <BigText>
                    아이의 <TextPoint>마음</TextPoint>을 깊이 이해하고 싶으신가요?
                </BigText>
                <BigText>
                    <TextPoint>HTP 검사</TextPoint>를 무료 받아보세요!
                </BigText>
                <SmallText>* HTP(House-Tree-Person) 검사는 아이의 마음을 알 수 있는 대표적인 심리검사입니다.</SmallText>
            </OnePageWrapper>
            <OnePageWrapper className="one-page" key={1}>
                <BigText>
                    검사를 통해{''}
                    <TextPoint> 이런 것</TextPoint>을 알 수 있어요.
                </BigText>
                <TextCard>아이의 욕구 🔥</TextCard>
                <TextCard>아이의 감정과 생각 🧠</TextCard>
                <TextCard>현재 아이의 심리상태 ❤️</TextCard>
                <SmallText>* 약식으로 진행되는 검사로, 아이에게 더 깊이 알아보고 싶으시다면</SmallText>
                <SmallText>검사 이후 개인 화상상담을 추가로 진행하시는 것을 추천드립니다.</SmallText>
            </OnePageWrapper>
            <OnePageWrapper className="one-page" key={2}>
                <BigText>그림검사,</BigText>
                <BigText>
                    <TextPoint>이럴 때</TextPoint>이용하면 좋아요!
                </BigText>
                <TextContainer>
                    <TextWrapper>
                        <TextEmo>🐣</TextEmo>
                        <SmallText>가볍게 아이의 마음을</SmallText>
                        <SmallText>알아보고 싶을 때</SmallText>
                    </TextWrapper>
                    <TextWrapper>
                        <TextEmo>🤷</TextEmo>
                        <SmallText>심리상담을 받아야 할지</SmallText>
                        <SmallText>고민하고 있을 때</SmallText>
                    </TextWrapper>
                </TextContainer>
            </OnePageWrapper>
            <BtnWrapper>
                <SmallText>스크롤을 내려보세요!</SmallText>
                <LoginBtn onClick={handleLoginClick}>로그인 하고 무료로 검사받기</LoginBtn>
            </BtnWrapper>

            <Pagination>
                <Dot key={0} active={0 === currentSection} />
                <Dot key={1} active={1 === currentSection} />
                <Dot key={2} active={2 === currentSection} />
            </Pagination>
        </OverviewContainer>
    );
};

export default Overview;
