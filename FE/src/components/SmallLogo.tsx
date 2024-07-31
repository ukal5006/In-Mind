import styled from 'styled-components';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const StyledLogo = styled(Logo)`
    font-size: 20px;
    height: 20px;
`;

function SmallLogo() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return <StyledLogo onClick={() => handleLogoClick()}>In Mind</StyledLogo>;
}
export default SmallLogo;
