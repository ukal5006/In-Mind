import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Overview />,
    },
]);

export default router;
