import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview';
import ChildUpdatePage from './pages/ChildUpdate';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ChildUpdatePage />,
    },
]);

export default router;
