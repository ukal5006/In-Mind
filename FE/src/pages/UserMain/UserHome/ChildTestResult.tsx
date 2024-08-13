import styled from 'styled-components';
import Slider from 'react-slick';
import Container from '../../../components/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { colors } from '../../../theme/colors';
import Text from '../../../components/Text';
import profileImage from './profile.png';
import axios from 'axios';
import { READREPORTSLIST } from '../../../apis/reportsApi';
import userStore from '../../../stores/userStore';
import { useEffect, useState } from 'react';
import useChildStore from '../../../stores/childStore';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';

interface Reports {
    reportCreatedAt: string;
    reportResult: string;
}

interface ResultData {
    childInfoIdx: number;
    childInfoName: string;
    reports: Reports[] | [];
}

const ChildTestContainer = styled(Container)`
    width: 400px;
    height: 600px;
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

const TestDate = styled(Text)`
    margin: 10px 0px;
`;

const ResultContainer = styled(Container)`
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    width: 320px;
    border-radius: 10px;
    height: 400px;
    margin-top: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-start;
`;

const ResultText = styled(Text)`
    width: 95%;
`;

function ChildTestResult() {
    const { userInfo, token } = userStore((state) => state);
    const { children } = useChildStore();
    const [result, setResult] = useState<ResultData[] | []>([]);

    //   const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(() => {
        if (userInfo?.userIdx) {
            axios
                .get(READREPORTSLIST(userInfo?.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => setResult(response.data.children || []));
        }
    }, [userInfo, token]);

    return (
        <ChildTestContainer>
            {children.length > 1 ? (
                <CustomSlider {...settings}>
                    {children.map((c, index) => (
                        <Slide key={c.childIdx}>
                            <ChildTestResultContainer>
                                <ChildInfoContainer>
                                    <ChildImage src={profileImage} alt="" />
                                    <ChildInfo>
                                        <NameText>
                                            <ChildName>{c.childName}</ChildName> {/* 이름 사용 */}
                                            어린이 ({c.childBirth}) {/* 생일 사용 */}
                                        </NameText>
                                    </ChildInfo>
                                </ChildInfoContainer>
                                {result.length > 0 && result[index].reports.length > 0 ? (
                                    <ResultContainer>
                                        <TestDate>
                                            검사일 :{' '}
                                            {moment(
                                                result[index].reports[result[index].reports.length - 1].reportCreatedAt
                                            ).format('YYYY-MM-DD')}
                                        </TestDate>
                                        <ResultText>
                                            {result[index].reports[result[index].reports.length - 1].reportResult}
                                        </ResultText>
                                    </ResultContainer>
                                ) : (
                                    <div>검사없음.</div>
                                )}
                            </ChildTestResultContainer>
                        </Slide>
                    ))}
                </CustomSlider>
            ) : children.length === 1 ? (
                <ChildTestResultContainer>
                    <ChildInfoContainer>
                        <ChildImage src={profileImage} alt="" />
                        <ChildInfo>
                            <NameText>
                                <ChildName>{children[0].childName}</ChildName> {/* 이름 사용 */}
                                어린이 ({children[0].childBirth}) {/* 생일 사용 */}
                            </NameText>
                        </ChildInfo>
                    </ChildInfoContainer>
                    {result.length > 0 && result[0].reports.length > 0 ? (
                        <>
                            <TestDate>
                                <div>
                                    검사일 :{' '}
                                    {moment(result[0].reports[result[0].reports.length - 1].reportCreatedAt).format(
                                        'YYYY-MM-DD'
                                    )}
                                </div>
                            </TestDate>
                            <ResultContainer>
                                <ResultText>{result[0].reports[result[0].reports.length - 1].reportResult}</ResultText>
                            </ResultContainer>
                        </>
                    ) : (
                        <>검사 없음</>
                    )}
                </ChildTestResultContainer>
            ) : (
                <>등록된 아이가 없습니다.</>
            )}
        </ChildTestContainer>
    );
}

export default ChildTestResult;
