import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import LoginContainer from './LoginContainer';
import LoginInput from './LoginInput';
import LoginLink from './LoginLink';
import loginLinkInfo from './loginLinkInfo';
import LoginLinkWrapper from './LoginLinkWrapper';
import LoginWrapper from './LoginWrapper';
import BigLogo from '../../components/BigLogo';
import { useNavigate } from 'react-router-dom';
import ReviewModalButton from '../../components/ReviewModal';
import axios from 'axios';
import { LOGIN } from '../../apis/userApi';
import userStore from '../../stores/userStore';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const setUser = userStore((state) => state.setUser); // Zustand의 setUser 가져오기

    const handleLogin = async () => {
        console.log('로그인 시작');
        try {
            const response = await axios.post(LOGIN, {
                email,
                password,
            });

            // 로그인 성공 시 JWT 저장 및 사용자 정보 설정
            // const { token, userInfo } = response.data; // 서버에서 반환된 JWT 및 사용자 정보
            const token = response.data; // 서버에서 반환된 JWT 및 사용자 정보
            localStorage.setItem('jwt', token); // JWT를 localStorage에 저장
            // setUser(userInfo); // Zustand에 사용자 정보 저장

            // if (userInfo.role === 'user') {
            navigate('/user');
            // } else {
            //     navigate('/counselor');
            // }
            console.log(response);
        } catch (error) {
            // 오류 처리
            console.log(error);
            alert('로그인 실패했습니다.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <LoginContainer>
            <ReviewModalButton>리뷰모달</ReviewModalButton>
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
