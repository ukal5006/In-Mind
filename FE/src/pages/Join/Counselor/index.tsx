import React, { useState } from 'react';
import JoinBtn from '../JoinBtn';
import JoinInput from '../JoinInput';
import AddrSearchModalContainer from './AddrSerachModalContainer';
import AddrSearchModalWrapper from './AddrSearchModalWrapper';
import axios from 'axios';
import CounselingOrganizationModal from './CounselorCenterSearch';
import { useOrganization, OrganizationProvider } from './OrganizationContext';

const apiUrl = 'https://i11b301.p.ssafy.io/api'
const role = 'COUNSELOR'

function CounselorForm() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [tel, setPhone] = useState('');
    const [time, setTime] = useState('');
    const { organizationName, orgIdx } = useOrganization();

    const emailCheckSubmit = async () => {
        try {
            console.log({
              email
            });
            await axios.get(apiUrl+'/users/email-check', {
              params :{
                email
              }
            });
            console.log('이메일 중복체크 완료');
            alert('사용 가능한 이메일');
          } catch (error) {
            console.error('이미 가지고 있는 이메일', error);
            alert('이미 존재하는 이메일');
          }
        };

        const signInCounselorSubmit = async () => {
            // 이메일 인증번호 확인 후 검증 제약조건 추가 필요
            if (password === passwordCheck){
                    try {
                    await axios.post(apiUrl+'/users/user', {
                        orgIdx,
                        email,
                        password,
                        name,
                        tel,
                        role
                    }, {
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                    console.log('회원가입 성공');
                    alert('회원가입 성공')
                } catch (error) {
                    console.error('회원가입 실패', error);
                    alert('회원가입 실패')
                }
            }
                 else {
                    alert('비밀번호가 일치하지 않습니다.')
                }
          };
    


    const signInSubmit = async () => {
        // 이메일 인증번호 확인 후 검증 제약조건 추가 필요
        if (password === passwordCheck){
                try {
                await axios.post(apiUrl+'/users/counselor', {
                    email,
                    password,
                    name,
                    tel,
                    role
                }, {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
                console.log('회원가입 성공');
                alert('회원가입 성공')
            } catch (error) {
                console.error('회원가입 실패', error);
                alert('회원가입 실패')
            }
        }
             else {
                alert('비밀번호가 일치하지 않습니다.')
            }
      };



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
            <JoinInput placeholder="전화번호" value={tel} onChange={(e) => setPhone(e.target.value)} />
            <CounselingOrganizationModal />
            <JoinInput placeholder="소속기관" value={organizationName} readOnly />
            
            <JoinBtn onClick={signInSubmit}>회원가입</JoinBtn>
    
        </>
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
