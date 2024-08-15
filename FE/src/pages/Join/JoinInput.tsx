import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import { colors } from '../../theme/colors';

const StyledInput = styled(Input)`
    height: 45px;
    width: 350px;
    padding: 10px 15px;
    margin: 15px 0;
    border: none;
    border-radius: 10px;  /* 모서리 둥글게 */
    background-color: ${colors.veryLightGray};  /* 회색 배경 */
    font-size: 16px;
    color: ${colors.darkGray};  /* 텍스트 색상 */
    box-sizing: border-box;
    
    &::placeholder {
        color: ${colors.gray};  /* placeholder 텍스트 색상 */
    }

    &:focus {
        outline: none;
        border: 1.5px solid ${colors.okGreen};  /* 포커스 시 테두리 색상 */
    }
`;

interface JoinInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string; // placeholder prop을 선택적으로 정의
}

const JoinInput: React.FC<JoinInputProps> = ({ placeholder, ...props }) => {
    return <StyledInput placeholder={placeholder} {...props} />;
};

export default JoinInput;
