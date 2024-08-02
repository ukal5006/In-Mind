import styled from 'styled-components';

const Pagination = styled.div`
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
`;

export default Pagination;
