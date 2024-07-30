import { useState } from 'react';
import BigLogo from '../../components/BigLogo';
import FindPwBtn from './FindPwBtn';
import FindPwContainer from './FindPwContainer';
import FindPwInput from './FindPwInput';
import FindPwWrapper from './FindPwWrapper';

function FindPw() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleGetCode = () => {
        console.log(name);
        console.log(email);
    };
    const handleFindPw = () => {
        console.log(code);
    };
    return (
        <FindPwContainer>
            <BigLogo />
            <FindPwWrapper>
                <FindPwInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                <FindPwInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FindPwBtn onClick={() => handleGetCode()}>인증번호 받기</FindPwBtn>
                <FindPwInput placeholder="인증번호" value={code} onChange={(e) => setCode(e.target.value)} />
                <FindPwBtn onClick={() => handleFindPw()}>비밀번호 찾기</FindPwBtn>
            </FindPwWrapper>
        </FindPwContainer>
    );
}

export default FindPw;
