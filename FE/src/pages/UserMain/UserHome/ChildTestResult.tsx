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
import Btn from '../../../components/Btn';
import { useNavigate } from 'react-router-dom';
import Glass from '../../../components/Glass';
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
    position: relative;
    ${Glass}
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
    margin-bottom: 10px;
`;
const ChildImage = styled.img`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${colors.darkGray};
    margin-right: 10px;
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
    width: 330px;
    border-radius: 10px;
    height: 370px;
    margin-top: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 10px;
    background-color: white;
    overflow-y: scroll;
`;

const ResultText = styled(Text)`
    width: 95%;
    /* height: 00px; */
    box-sizing: border-box;
    /* overflow-y: scroll; */
`;

const NoChild = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100px;
    padding: 20px;
`;

const NoChildText = styled(Text)`
    font-size: 15px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
`;

const AddChildBtn = styled(Btn)`
    padding: 12px 20px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    background-color: ${colors.okGreen};
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgb(96, 241, 157);
    }
`;

function ChildTestResult() {
    const { userInfo, token } = userStore((state) => state);
    const { children } = useChildStore();
    const [result, setResult] = useState<ResultData[] | []>([]);
    const navigate = useNavigate();

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
                                    <>
                                        <TestDate>
                                            검사일 :{' '}
                                            {moment(
                                                result[index].reports[result[index].reports.length - 1].reportCreatedAt
                                            ).format('YYYY-MM-DD')}
                                        </TestDate>
                                        <ResultContainer>
                                            <ResultText>
                                                {result[index].reports[result[index].reports.length - 1].reportResult}
                                            </ResultText>
                                        </ResultContainer>
                                    </>
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
                <NoChild>
                    <NoChildText>등록된 아이가 없습니다.</NoChildText>
                    <AddChildBtn onClick={() => navigate('/user/mypage/childInfo')}>아이 정보 등록하기</AddChildBtn>
                </NoChild>
            )}
        </ChildTestContainer>
    );
}

export default ChildTestResult;
