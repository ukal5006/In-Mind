import styled from 'styled-components';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const StyledLogo = styled(Logo)`
    font-size: 40px;
    margin-bottom: 30px;
`;

function BigLogo() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return <StyledLogo onClick={() => handleLogoClick()}>In Mind</StyledLogo>;
}
export default BigLogo;
