import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../theme/colors';

const LoginWrapper = styled(Wrapper)`
    flex-direction: column;
    box-sizing: border-box;
    width: 500px;
    height: 300px;
    border: 1px solid ${colors.gray};
    border-radius: 20px;
`;
export default LoginWrapper;
