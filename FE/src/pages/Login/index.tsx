import { useState } from 'react';
import LoginBtn from './LoginBtn';
import LoginContainer from './LoginContainer';
import LoginInput from './LoginInput';
import LoginLink from './LoginLink';
import loginLinkInfo from './loginLinkInfo';
import LoginLinkWrapper from './LoginLinkWrapper';
import LoginWrapper from './LoginWrapper';
import BigLogo from '../../components/BigLogo';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 로그인 처리 로직을 여기에 추가합니다.
        console.log('이메일:', email);
        console.log('비밀번호:', password);
        // 예: API 호출 등
    };

    return (
        <LoginContainer>
            <BigLogo />
            <LoginWrapper>
                <LoginInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <LoginInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
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
