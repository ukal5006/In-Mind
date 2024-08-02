import { useState } from 'react';
import FindIdBtn from './FindIdBtn';
import FindIdContainer from './FindIdContainer';
import FindIdInput from './FindIdInput';
import FindIdWrapper from './FindIdWrapper';
import BigLogo from '../../components/BigLogo';

function FindId() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleFindPw = () => {
        console.log(name);
        console.log(phone);
    };
    return (
        <FindIdContainer>
            <BigLogo />
            <FindIdWrapper>
                <FindIdInput placeholder="이메일" value={name} onChange={(e) => setName(e.target.value)} />
                <FindIdInput
                    placeholder="전화번호 ( - 를 빼고 입력해주세요)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <FindIdBtn onClick={() => handleFindPw()}> 아이디 찾기</FindIdBtn>
            </FindIdWrapper>
        </FindIdContainer>
    );
}

export default FindId;
