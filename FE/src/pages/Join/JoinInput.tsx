import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';

const StyledInput = styled(Input)`
    height: 50px;
    width: 400px;
`;

interface JoinInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string; // placeholder prop을 선택적으로 정의
}

const JoinInput: React.FC<JoinInputProps> = ({ placeholder, ...props }) => {
    return <StyledInput placeholder={placeholder} {...props} />;
};

export default JoinInput;
