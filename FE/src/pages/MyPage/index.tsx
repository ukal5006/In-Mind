import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MyPageContainer from './MyPageContainer';
import MyPageContent from './MyPageContent';
import UserMyPageList from './UserMyPageList';
import CounselorMyPageList from './CounselorMyPageList';
import styled from 'styled-components';
import axios from 'axios';
import { CHECKPW } from '../../apis/userApi';
import userStore from '../../stores/userStore';
import useCounselorStore from '../../stores/counselorStore';
import Glass from '../../components/Glass';

const PasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    background-color: #ffffff;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    ${Glass}
`;

const Title = styled.h2`
    font-size: 19px;
    color: #333;
    margin-bottom: 20px;
    line-height: 1.5;
    text-align: center;
    font-weight: bold;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    font-size: 13px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
    background-color: #10c263;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 17px;
    font-weight: bold;
`;

function MyPage() {
    const { userInfo, token } = userStore((state) => state);

    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 여기서부터 테스트 코드. 아래에 끝지점 있음

    const { counselors, fetchCounselors } = useCounselorStore();
    const showAllCounselor = () => {
        fetchCounselors(null);
    };

    const topAverageCounselor = () => {
        const sortedCounselors = [...counselors].sort((a, b) => {
            // a와 b의 reviewAverage가 숫자인지 확인
            const aAvg = typeof a.reviewAverage === 'number' ? a.reviewAverage : 0;
            const bAvg = typeof b.reviewAverage === 'number' ? b.reviewAverage : 0;

            return aAvg - bAvg;
        });

        console.log(sortedCounselors);
        return sortedCounselors;
    };

    const sortedAverage = () => {
        topAverageCounselor();
    };

    const topReviewCountCounselor = () => {
        const sortedCounselors = [...counselors].sort((a, b) => {
            const aCnt = typeof a.reviewCount === 'number' ? a.reviewCount : 0;
            const bCnt = typeof b.reviewCount === 'number' ? b.reviewCount : 0;

            return aCnt - bCnt;
        });

        console.log(sortedCounselors);
        return sortedCounselors;
    };

    const sortedCount = () => {
        topReviewCountCounselor();
    };

    // 여기까지 테스트 코드

    const handleSubmit = () => {
        axios
            .post(
                CHECKPW,
                {
                    email: userInfo?.userEmail,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            )
            .then((response) => {
                setIsAuthenticated(true);
                setError('');
                if (userInfo?.userRole === 'USER') {
                    navigate('userInfo');
                } else {
                    navigate('counselorInfo');
                }
            })
            .catch((error) => {
                console.log(error);
                setError('비밀번호가 일치하지 않습니다.');
            });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <MyPageContainer>
            {/* <button onClick={showAllCounselor}>
        상담사 상세조회 콘솔로 보여주기
      </button>
      <button onClick={sortedAverage}>
        상담사 리뷰 점수 순 으로 정렬 콘솔로 보여주기
      </button>
      <button onClick={sortedCount}>
        상담사 리뷰 카운트 순 으로 정렬 콘솔로 보여주기
      </button> */}
            {userInfo?.userRole === 'USER' ? <UserMyPageList /> : <CounselorMyPageList />}
            <MyPageContent>
                {!isAuthenticated ? (
                    <PasswordContainer>
                        <Title>
                            개인 정보 조회를 위해서는 인증이 필요합니다.
                            <br />
                            비밀번호 입력 후 확인 버튼을 클릭해 주세요.
                        </Title>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="비밀번호"
                        />
                        {error && <span>{error}</span>}
                        <Button onClick={handleSubmit}>확인</Button>
                    </PasswordContainer>
                ) : (
                    <Outlet />
                )}
            </MyPageContent>
        </MyPageContainer>
    );
}

export default MyPage;
