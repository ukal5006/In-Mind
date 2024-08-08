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

const PasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const Input = styled.input`
    margin: 10px;
`;

const Button = styled.button`
    margin-top: 20px;
`;

function MyPage() {
    const { userInfo } = userStore((state) => state);
    

    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // 여기서부터 테스트 코드. 아래에 끝지점 있음


    const {counselors, fetchCounselors} = useCounselorStore()
    const showAllCounselor = () => {fetchCounselors(null)}

    const topAverageCounselor = () => {
        const sortedCounselors = [...counselors].sort((a, b) => {
          // a와 b의 reviewAverage가 숫자인지 확인
          const aAvg = typeof a.reviewAverage === 'number' ? a.reviewAverage : 0;
          const bAvg = typeof b.reviewAverage === 'number' ? b.reviewAverage : 0;
          
          return aAvg - bAvg;
        });
      
        console.log(sortedCounselors);
        return sortedCounselors;
      }

    const sortedAverage = () => {
        topAverageCounselor()
    }

    const topReviewCountCounselor = () => {
        const sortedCounselors = [...counselors].sort((a, b) => {
          const aCnt = typeof a.reviewCount === 'number' ? a.reviewCount : 0;
          const bCnt = typeof b.reviewCount === 'number' ? b.reviewCount : 0;
          
          return aCnt - bCnt;
        });
      
        console.log(sortedCounselors);
        return sortedCounselors;
      }
  
      const sortedCount = () => {
        topReviewCountCounselor()
    }


    // 여기까지 테스트 코드


    const handleSubmit = () => {
        axios
            .post(CHECKPW, {
                email: userInfo?.userEmail,
                password,
            })
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
            <button onClick={showAllCounselor}>상담사 상세조회 콘솔로 보여주기</button>
            <button onClick={sortedAverage}>상담사 리뷰 점수 순 으로 정렬 콘솔로 보여주기</button>
            <button onClick={sortedCount}>상담사 리뷰 카운트 순 으로 정렬 콘솔로 보여주기</button>
            {userInfo?.userRole === 'USER' ? <UserMyPageList /> : <CounselorMyPageList />}
            <MyPageContent>
                {!isAuthenticated ? (
                    <PasswordContainer>
                        <h2>비밀번호 확인</h2>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="비밀번호를 입력하세요"
                        />
                        {error && <span>{error}</span>}
                        <Button onClick={handleSubmit}>확인</Button>
                    </PasswordContainer>
                ) : (
                    <>
                        <Outlet />
                    </>
                )}
            </MyPageContent>
        </MyPageContainer>
    );
}

export default MyPage;
