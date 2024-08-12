import styled from 'styled-components';
import Slider from 'react-slick';
import Container from '../../../components/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { colors } from '../../../theme/colors';
import Text from '../../../components/Text';
import profileImage from './profile.png';
import testResult from './testresult.png';
import axios from 'axios';
import { READREPORTSLIST } from '../../../apis/reportsApi';
import userStore from '../../../stores/userStore';
import { useState } from 'react';
import useChildStore from '../../../stores/childStore';
import { useNavigate } from 'react-router-dom';

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
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    position: relative;
`;

const CustomSlider = styled(Slider)`
    width: 100%;
    height: 90%;
`;
const Slide = styled.div`
    display: flex !important;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
`;

const ChildTestResultContainer = styled(Container)`
    flex-direction: column;
`;

const ChildInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ChildImage = styled.img`
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
    const { userInfo, token } = userStore((state) => state);
    const { children } = useChildStore();
    const [result, setResult] = useState('');

    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // appendDots: (dots: any) => (
        //     <div
        //         style={{
        //             width: '100%',
        //             position: 'absolute',
        //             bottom: '-10px',
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //         }}
        //     >
        //         <ul> {dots} </ul>
        //     </div>
        // ),
        // dotsClass: 'dots_custom',
    };
    if (userInfo?.userIdx) {
        axios
            .get(READREPORTSLIST(userInfo?.userIdx), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => setResult(response.data.children));
    }
    return (
        <ChildTestContainer>
            {/* <CustomSlider {...settings}>
                {children.map((c: any, index: number) => (
                    <Slide key={index}>
                        <ChildTestResultContainer>
                            <ChildInfoContainer>
                                <ChildImage src={profileImage} alt="" />
                                <ChildInfo>
                                    <NameText>
                                        <ChildName>{c.name}</ChildName>
                                        어린이 ({c.birthday})
                                    </NameText>
                                    <TestDate>검사 일시 : {result[index]}</TestDate>
                                </ChildInfo>
                            </ChildInfoContainer>
                            <TestGraph>
                                <img src={testResult} alt="" />
                            </TestGraph> */}
            {/* <ResultContainer><ResultText>{e.updated_at}</ResultText></ResultContainer> */}
            {/* </ChildTestResultContainer> */}
            {/* </Slide> */}
            {/* // ))} */}
            {/* </CustomSlider> */}
        </ChildTestContainer>
    );
}

export default ChildTestResult;
