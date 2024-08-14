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

const Overview: React.FC = () => {
    const navigate = useNavigate();
    const overviewText: string[][] = [
        [
            '아이의 마음을 깊이 이해하고 싶으신가요?',
            'HTP 검사를 무료 받아보세요!',
            '* HTP(House-Tree-Person) 검사는 아이의 성격, 정서, 인지능력을 종합적으로 파악할 수 있는 대표적인 심리검사입니다.',
        ],
        ['AI의 그림 분석을 통해 아이의 숨겨진 생각과', '감정을 이해할 수 있도록 도와드립니다.'],
        ['아이의 건강한 성장을 위해', '지금 바로 검사를 받아보세요.'],
    ];
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
            {overviewText.map((section, sectionIndex) => (
                <OnePageWrapper className="one-page" key={sectionIndex}>
                    {section.map((text, textIndex) => {
                        // 첫 번째 섹션의 마지막 텍스트는 SmallText로, 나머지는 BigText로
                        if (sectionIndex === 0 && textIndex === section.length - 1) {
                            return <SmallText key={textIndex}>{text}</SmallText>;
                        }
                        return <BigText key={textIndex}>{text}</BigText>;
                    })}
                </OnePageWrapper>
            ))}
            <BtnWrapper>
                <SmallText>⇩ Scroll ⇩</SmallText>
                <LoginBtn onClick={handleLoginClick}>로그인 하고 무료로 검사받기</LoginBtn>
            </BtnWrapper>

            <Pagination>
                {overviewText.map((_, index) => (
                    <Dot key={index} active={index === currentSection} />
                ))}
            </Pagination>
        </OverviewContainer>
    );
};

export default Overview;
