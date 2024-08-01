import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Container from '../../../components/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { colors } from '../../../theme/colors';
import childInfo from '../../../testData/childInfo';
import Text from '../../../components/Text';

interface childData {
    name: string;
    birthday: string;
    created_at: string;
    updated_at: string;
}

const ChildTestContainer = styled(Container)`
    width: 90%;
    height: 80%;
    border-radius: 10px;
    /* overflow: hidden; 캐러셀이 컨테이너를 넘치지 않도록 설정 */
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    position: relative;
`;

const Slide = styled.div`
    display: flex !important;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 500px;
    position: relative;
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 10px; /* 페이지네이션 위치 조정 */
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.8); /* 배경색 */
    border-radius: 5px;
    padding: 5px 10px;
`;

const NameText = styled(Text)`
    color: ${colors.green};
`;

function ChildTestResult() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => setCurrentSlide(next), // 슬라이드 변경 시 현재 슬라이드 인덱스 업데이트
    };

    return (
        <ChildTestContainer>
            <Slider {...settings}>
                {childInfo.map((e: childData, index: number) => (
                    <Slide key={index}>
                        <NameText>{e.name}</NameText>
                        <div>{e.birthday}</div>
                        <div>{e.created_at}</div>
                        <div>{e.updated_at}</div>
                    </Slide>
                ))}
            </Slider>
            <Pagination>
                {currentSlide + 1} / {childInfo.length} {/* 현재 슬라이드와 총 슬라이드 수 표시 */}
            </Pagination>
        </ChildTestContainer>
    );
}

export default ChildTestResult;
