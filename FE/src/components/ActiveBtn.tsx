import styled from 'styled-components';
import Btn from './Btn';
import { colors } from '../theme/colors';

const ActiveBtn = styled(Btn)`
    font-size: 16px;
    background-color: ${colors.green};
    color: ${colors.lightWhite};
`;

export default ActiveBtn;
