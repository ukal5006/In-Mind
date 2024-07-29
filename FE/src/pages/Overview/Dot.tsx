import styled from 'styled-components';

const Dot = styled.div<{ active: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? '#007bff' : '#ccc')}; /* 선택된 점은 파란색, 나머지는 회색 */
    margin: 5px 0; /* 점 사이의 간격 */
    transition: background-color 0.3s;
`;

export default Dot;
