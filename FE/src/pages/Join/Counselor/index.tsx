import { useState } from 'react';
import JoinBtn from '../JoinBtn';
import JoinInput from '../JoinInput';
import AddrSearchModalContainer from './AddrSerachModalContainer';
import AddrSearchModalWrapper from './AddrSearchModalWrapper';

function Counselor() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [addr, setAddr] = useState('');
    const [time, setTime] = useState('');

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
            <JoinInput placeholder="소속기관" value={addr} onChange={(e) => setAddr(e.target.value)} />
            <JoinInput placeholder="상담 가능시간" value={time} onChange={(e) => setTime(e.target.value)} />

            <JoinBtn>회원가입</JoinBtn>
            {/* <AddrSearchModalContainer>
                <AddrSearchModalWrapper>
                    <JoinInput placeholder="기관 검색" />
                </AddrSearchModalWrapper>
            </AddrSearchModalContainer> */}
        </>
    );
}

export default Counselor;
