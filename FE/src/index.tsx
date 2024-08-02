import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <>
        <GlobalStyle />
        <RouterProvider router={router} />
    </>
);
