import { createBrowserRouter } from 'react-router-dom';
import MainLayaut from '../Layaut/MainLayaut';
import NotFound from '../Pages/NotFound';

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayaut />,
    errorElement: <NotFound />,
  },
]);

export default route;
