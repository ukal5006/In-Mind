import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MyPageContainer from './MyPageContainer';
import MyPageContent from './MyPageContent';
import MyPageList from './MyPageList';
import styled from 'styled-components';

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
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const correctPassword = 'ssafy'; // 실제 비밀번호로 변경하세요
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError('');
            navigate('userInfo');
        } else {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <MyPageContainer>
            <MyPageList />
            <MyPageContent>
                {!isAuthenticated ? (
                    <PasswordContainer>
                        <h2>비밀번호 확인</h2>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
