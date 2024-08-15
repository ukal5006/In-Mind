import styled from 'styled-components';
import Container from '../../components/Container';

const UserContainer = styled(Container)`
    flex-direction: column;
    width: 100vw;
    /* height: 100vh; */
    min-width: 700px;
    justify-content: start;
    box-sizing: border-box;
    background: linear-gradient(to bottom right, #87ceeb, #a8e063);
    position: relative;
`;

export default UserContainer;
