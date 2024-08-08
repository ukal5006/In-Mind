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


    const {fetchCounselors} = useCounselorStore()
    const anything = () => {fetchCounselors(null)}

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
            <button onClick={anything}>상담사 상세조회 콘솔로 보여주기</button>
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
