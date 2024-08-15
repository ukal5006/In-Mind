import React from 'react';
import ChildInfoEdit from './ChildUpdateContainer';
import styled from 'styled-components'

const Header = styled.header`
    text-align: center; /* 중앙 정렬 */
    margin-bottom: 20px; /* 아래 여백 */
`;

const Title = styled.h1`
    font-size: 24px; /* 타이틀 글자 크기 */
    color: #333; /* 글자 색상 */
    position: relative; /* 포지션 설정 */
    padding-bottom: 10px; /* 아래 패딩 */
    font-weight: 700;
    
    &::after {
        content: ''; /* 가상 요소 생성 */
        display: block; /* 블록 요소로 설정 */
        width: 50px; /* 밑줄 길이 */
        height: 4px; /* 밑줄 두께 */
        background-color: #007bff; /* 밑줄 색상 */
        margin: 0 auto; /* 중앙 정렬 */
        border-radius: 2px; /* 둥근 모서리 */
        position: absolute; /* 절대 위치 설정 */
        left: 50%; /* 중앙 정렬 */
        transform: translateX(-50%); /* 중앙으로 이동 */
        bottom: -5px; /* 밑줄 위치 조정 */
    }
`;



export interface ChildUpdateProps {
    type: 'create' | 'update';
    childIdx?: number;
    onClose: () => void;
    onSuccess: () => void;
}

const ChildUpdate: React.FC<ChildUpdateProps> = ({ type, childIdx, onClose, onSuccess }): JSX.Element => {
    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <div>
            <Header>
                <Title>{type === 'create' ? '아이 등록' : '아이 정보 수정'}</Title>
            </Header>
            <main>
                <ChildInfoEdit type={type} childIdx={childIdx} onClose={handleSuccess} />
            </main>
        </div>
    );
};

export default ChildUpdate;
