import React, { useState } from 'react';
import JoinBtn from '../JoinBtn';
import JoinInput from '../JoinInput';
import AddrSearchModalContainer from './AddrSerachModalContainer';
import AddrSearchModalWrapper from './AddrSearchModalWrapper';
import axios from 'axios';
import CounselingOrganizationModal from './CounselorCenterSearch';
import { useOrganization, OrganizationProvider } from './OrganizationContext';
import userStore from '../../../stores/userStore';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';
import emailVerification from '../../../apis/emailVerification';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://i11b301.p.ssafy.io/api';
const role = 'COUNSELOR';

const CoJoin = styled.div`
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

const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 350px; /* 두 개의 input이 175px 너비를 가지므로 이를 감쌀 수 있는 충분한 너비 */
`;

const HalfWidthInput = styled(JoinInput)`
    width: calc(50% - 5px); /* 원래 크기의 반절, 두 input 사이에 20px 간격을 주기 위해 각각 10px씩 뺌 */
`;

function CounselorForm() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeCheck, setCodeCheck] = useState(0);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [tel, setPhone] = useState('');
    const { organizationName, orgIdx } = useOrganization();
    const { token } = userStore();
    const navigate = useNavigate();

    const emailCheckSubmit = async () => {
        try {
            console.log({
                email,
            });

            await axios.get(apiUrl + '/users/email-check', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
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

    const signInCounselorSubmit = async () => {
        // 이메일 인증번호 확인 후 검증 제약조건 추가 필요
        if (password === passwordCheck) {
            try {
                await axios.post(
                    apiUrl + '/users/user',
                    {
                        orgIdx,
                        email,
                        password,
                        name,
                        tel,
                        role,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    }
                );
                console.log('회원가입 성공');
                alert('회원가입 성공');
            } catch (error) {
                console.error('회원가입 실패', error);
                alert('회원가입 실패');
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const signInSubmit = async () => {
        if (password === passwordCheck) {
            try {
                await axios.post(
                    apiUrl + '/users/counselor',
                    {
                        email,
                        password,
                        name,
                        tel,
                        role,
                        orgIdx,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
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
        <CoJoin>
            <EmailWrapper>
                <JoinInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={emailCheckSubmit}>중복확인</button>
            </EmailWrapper>
            <JoinBtn onClick={handleEmailVerification}>인증번호 받기</JoinBtn>
            <JoinInput placeholder="인증번호" value={code} onChange={(e) => setCode(e.target.value)} />
            <JoinInput
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <JoinInput
                placeholder="비밀번호 확인"
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <InputRow>
                <HalfWidthInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                <HalfWidthInput
                    placeholder="전화번호"
                    value={tel}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                />
            </InputRow>

            <EmailWrapper>
                <JoinInput placeholder="소속기관" value={organizationName} readOnly />
                <CounselingOrganizationModal />
            </EmailWrapper>

            <JoinBtn onClick={signInSubmit}>회원가입</JoinBtn>
        </CoJoin>
    );
}

function Counselor() {
    return (
        <OrganizationProvider>
            <CounselorForm />
        </OrganizationProvider>
    );
}

export default Counselor;
