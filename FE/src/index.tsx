import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './GlobalStyle';
import Overview from './pages/Overview';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <>
        <GlobalStyle />
        <Overview />
    </>
);
