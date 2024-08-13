import { useState } from 'react';
import JoinBtn from '../JoinBtn';
import JoinInput from '../JoinInput';
import axios from 'axios';
import emailVerification from '../../../apis/emailVerification';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://i11b301.p.ssafy.io/api';

const UserJoin = styled.div`
    display: flex;
    flex-direction: column;
    /* height: auto; */
    align-items: center;
    margin-top: 60px;
    margin-bottom: 20px;
`;
const EmailWrapper = styled.div`
    display: flex;
    align-items: center;
    & > input {
        width: calc(100% - 110px);
        margin-right: 10px;
    }
    & > button {
        width: 110px;
        height: 45px;
        padding: 0px;
        font-weight: 500;
        font-size: 15px;
        color: ${colors.white};
        border-radius: 10px;
        background-color: ${colors.okGreen};
    }
`;

function User() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeCheck, setCodeCheck] = useState(0);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const role = 'USER';
    const navigate = useNavigate();

    const emailCheckSubmit = async () => {
        try {
            console.log({
                email,
            });
            await axios.get(apiUrl + '/users/email-check', {
                params: {
                    email,
                },
            });
            console.log('이메일 중복체크 완료');
            alert('사용 가능한 이메일');
        } catch (error) {
            console.error('이미 가지고 있는 이메일', error);
            alert('이미 존재하는 이메일');
        }
    };

    const handleEmailVerification = () => {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        setCodeCheck(randomNumber);
        console.log(randomNumber);
        emailVerification({ email, code: randomNumber });
        alert('이메일 인증번호가 발송되었습니다.');
    };

    const signInSubmit = async () => {
        // 이메일 인증번호 확인 후 검증 제약조건 추가 필요
        // if (password === passwordCheck && Number(code) === codeCheck) {
        if (password === passwordCheck) {
            try {
                await axios.post(
                    apiUrl + '/users/user',
                    {
                        email,
                        password,
                        name,
                        tel,
                        role,
                    },
                    {
                        headers: {
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    }
                );
                console.log('회원가입 성공');
                alert('회원가입 성공');
                navigate('/login');
            } catch (error) {
                console.error('회원가입 실패', error);
                alert('회원가입 실패');
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <UserJoin>
            <EmailWrapper>
                <JoinInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={emailCheckSubmit}>중복확인</button>
            </EmailWrapper>
            <JoinBtn onClick={handleEmailVerification}>인증번호 받기</JoinBtn>
            <JoinInput placeholder="인증번호" value={code} onChange={(e) => setCode(e.target.value)} />
            <JoinInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <JoinInput
                placeholder="비밀번호 확인"
                value={passwordCheck}
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <JoinInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <JoinInput placeholder="전화번호" value={tel} onChange={(e) => setTel(e.target.value)} />

            <JoinBtn onClick={signInSubmit}>회원가입</JoinBtn>
        </UserJoin>
    );
}

export default User;
