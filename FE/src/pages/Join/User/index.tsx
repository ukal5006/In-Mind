import { useState } from 'react';
import JoinBtn from '../JoinBtn';
import JoinInput from '../JoinInput';

function User() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <>
            <JoinInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <JoinBtn>인증번호 받기</JoinBtn>
            <JoinInput placeholder="인증번호" value={code} onChange={(e) => setCode(e.target.value)} />
            <JoinInput placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <JoinInput
                placeholder="비밀번호 확인"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <JoinInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <JoinInput placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <JoinBtn>회원가입</JoinBtn>
        </>
    );
}

export default User;
