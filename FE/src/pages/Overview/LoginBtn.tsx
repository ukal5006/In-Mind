import styled from 'styled-components';
import { colors } from '../../theme/colors';
import Btn from '../../components/Btn';

const LoginBtn = styled(Btn)`
    height: 50px;
    width: 700px;
    background-color: ${colors.okGreen};
    color: ${colors.white};
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
`;

export default LoginBtn;
