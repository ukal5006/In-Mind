import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../theme/colors';

const JoinWrapper = styled(Wrapper)`
    flex-direction: column;
    box-sizing: border-box;
    width: 500px;
    height: 700px;
    border: 1px solid ${colors.gray};
    border-radius: 20px;
    position: relative;
`;
export default JoinWrapper;
