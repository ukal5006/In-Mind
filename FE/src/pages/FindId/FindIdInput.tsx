import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import { colors } from '../../theme/colors';

const StyledInput = styled(Input)`
    height: 50px;
    width: 400px;
    padding: 10px 15px;
    margin: 10px 0;
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
        // box-shadow: 0px 0px 5px ${colors.gray};  /* 포커스 시 그림자 추가 */
    }
`;

interface FindIdInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string; // placeholder prop을 선택적으로 정의
}

const FindIdInput: React.FC<FindIdInputProps> = ({ placeholder, ...props }) => {
    return <StyledInput placeholder={placeholder} {...props} />;
};

export default FindIdInput;
