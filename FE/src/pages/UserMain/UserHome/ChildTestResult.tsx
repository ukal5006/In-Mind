import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Container from '../../../components/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { colors } from '../../../theme/colors';
import childInfo from '../../../testData/childInfo';
import Text from '../../../components/Text';
import profileImage from './profile.png';
import testResult from './testresult.png';

interface childData {
    name: string;
    birthday: string;
    created_at: string;
    updated_at: string;
    testDate: string;
    // testResult: string;
}

const ChildTestContainer = styled(Container)`
    width: 400px;
    height: 700px;
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
    /* height: 500px; */
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

const ChildTestResultContainer = styled(Container)`
    flex-direction: column;
`;

const ChildInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ChildImage = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${colors.darkGray};
    margin-right: 20px;
`;

const ChildInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`;

const NameText = styled(Text)`
    margin-bottom: 10px;
    height: 25px;
    font-weight: 700;
`;

const ChildName = styled(Text)`
    font-size: 18px;
    color: ${colors.green};
    margin-right: 10px;
    &:hover {
        box-shadow: 0 2px 0 ${colors.green};
    }
`;

const TestGraph = styled.div`
    height: 300px;
    & > img {
        width: 300px;
    }
`;

const TestDate = styled(Text)``;

const ResultContainer = styled(Container)`
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    width: 320px;
    border-radius: 10px;
    height: 200px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const ResultText = styled(Text)`
    width: 95%;
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
                        <ChildTestResultContainer>
                            <ChildInfoContainer>
                                <ChildImage>
                                    <img src={profileImage} alt="" />
                                </ChildImage>
                                <ChildInfo>
                                    <NameText>
                                        <ChildName>{e.name}</ChildName>
                                        어린이 ({e.birthday})
                                    </NameText>
                                    <TestDate>검사 일시 : {e.testDate}</TestDate>
                                </ChildInfo>
                            </ChildInfoContainer>
                            <TestGraph>
                                <img src={testResult} alt="" />
                            </TestGraph>
                            <ResultContainer>
                                <ResultText>{e.updated_at}</ResultText>
                            </ResultContainer>
                        </ChildTestResultContainer>
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
