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
    const [code, setCode] = useState<any>();
    const [codeCheck, setCodeCheck] = useState<any>();
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 상태
    const role = 'USER';
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규 표현식
    const phoneRegex = /^010\d{8}$/; // 전화번호 형식 정규 표현식

    const emailCheckSubmit = async () => {
        if (!emailRegex.test(email)) {
            alert('유효한 이메일 형식이 아닙니다.');
            return;
        }

        try {
            console.log({ email });
            await axios.get(apiUrl + '/users/email-check', {
                params: { email },
            });
            console.log('이메일 중복체크 완료');
            alert('사용 가능한 이메일');
            setIsEmailChecked(true); // 중복 확인이 완료되면 상태 변경
        } catch (error) {
            console.error('이미 가지고 있는 이메일', error);
            alert('이미 존재하는 이메일');
            setIsEmailChecked(false); // 중복 확인 실패 시 상태 변경
        }
    };

    const handleEmailVerification = () => {
        if (!isEmailChecked) {
            alert('먼저 이메일 중복 확인을 해주세요.');
            return;
        }
        if (!emailRegex.test(email)) {
            alert('유효한 이메일 형식이 아닙니다.');
            return;
        }
        if (email.length > 30) {
            alert('이메일은 최대 30자까지 입력 가능합니다.');
            return;
        }

        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        setCodeCheck(randomNumber);
        console.log(randomNumber);
        emailVerification({ email, code: randomNumber });
        alert('이메일 인증번호가 발송되었습니다.');
    };

    const signInSubmit = async () => {
        if (Number(code) !== Number(codeCheck)) {
            console.log(code);
            console.log(codeCheck);
            alert('인증번호가 일치하지 않습니다.');
            return;
        }
        if (password !== passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!phoneRegex.test(tel)) {
            alert('전화번호 형식이 올바르지 않습니다. (예: 010 xxxx xxxx)');
            return;
        }

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
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setIsEmailChecked(false); // 이메일 변경 시 중복 확인 상태 초기화
    };

    const handlePhoneChange = (e: any) => {
        setTel(e.target.value);
    };

    return (
        <UserJoin>
            <EmailWrapper>
                <JoinInput
                    placeholder="이메일"
                    maxLength={30}
                    value={email}
                    onChange={handleEmailChange} // 이메일 변경 시 상태 업데이트
                />
                <button onClick={emailCheckSubmit}>중복확인</button>
            </EmailWrapper>
            <JoinBtn onClick={handleEmailVerification}>인증번호 받기</JoinBtn>
            <JoinInput placeholder="인증번호" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} />
            <JoinInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={30}
            />
            <JoinInput
                placeholder="비밀번호 확인"
                value={passwordCheck}
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                maxLength={30}
            />
            <JoinInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <JoinInput
                placeholder="전화번호 (예: 010xxxxxxxx)"
                value={tel}
                onChange={handlePhoneChange}
                maxLength={11}
            />

            <JoinBtn onClick={signInSubmit}>회원가입</JoinBtn>
        </UserJoin>
    );
}

export default User;
