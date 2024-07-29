import styled from 'styled-components';

const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.2s;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export default Btn;
