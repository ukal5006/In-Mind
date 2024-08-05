import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../theme/colors';

const FindPwWrapper = styled(Wrapper)`
    flex-direction: column;
    box-sizing: border-box;
    width: 500px;
    height: 400px;
    border: 1px solid ${colors.gray};
    border-radius: 20px;
`;
export default FindPwWrapper;
