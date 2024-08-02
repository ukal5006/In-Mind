import styled from 'styled-components';
import Container from '../../components/Container';
import BigText from './BigText';

const OverviewContainer = styled(Container)`
    flex-direction: column;
    width: 100vw;
    /* height: 100vh; */
    min-width: 750px;
    position: relative;

    /* background-color: black; */
    ${BigText} {
        margin-bottom: 40px;
    }
`;

export default OverviewContainer;
