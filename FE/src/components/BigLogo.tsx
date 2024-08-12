import styled from 'styled-components';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/colors';

const StyledLogo = styled(Logo)`
    font-size: 40px;
    margin-bottom: 30px;
    color: ${colors.realDarkGreen}
`;

function BigLogo() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return <StyledLogo onClick={() => handleLogoClick()}>In Mind</StyledLogo>;
}
export default BigLogo;
