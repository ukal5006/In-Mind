import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import LoginContainer from './LoginContainer';
import LoginInput from './LoginInput';
import LoginLink from './LoginLink';
import loginLinkInfo from './loginLinkInfo';
import LoginLinkWrapper from './LoginLinkWrapper';
import LoginWrapper from './LoginWrapper';
import BigLogo from '../../components/BigLogo';
import userInfo from '../../testData/userInfo';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === userInfo.email) {
            if (userInfo.role === 'user') {
                navigate('/user');
            } else {
                navigate('/counselor');
            }
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.'); // 알림창 추가
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <LoginContainer>
            <BigLogo />
            <LoginWrapper>
                <LoginInput
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
                />
                <LoginInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
                />
                <LoginBtn onClick={() => handleLogin()}>로그인</LoginBtn>
                <LoginLinkWrapper>
                    {loginLinkInfo.map((e, i) => {
                        return (
                            <li key={i}>
                                <LoginLink to={e.link}>{e.title}</LoginLink>
                            </li>
                        );
                    })}
                </LoginLinkWrapper>
            </LoginWrapper>
        </LoginContainer>
    );
}

export default Login;
