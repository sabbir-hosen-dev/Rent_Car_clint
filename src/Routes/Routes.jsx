import { createBrowserRouter } from 'react-router-dom';
import MainLayaut from '../Layaut/MainLayaut';
import NotFound from '../Pages/NotFound';
import Home from '../Pages/Home';
import PrivetRoute from './PrivetRoutes';
import AvaiableCars from '../Pages/AvaiableCars';
import AddCar from '../Pages/AddCar';
import MyBookings from '../Pages/MyBOokings';
import Login from '../Pages/AuthPate/Login';
import SignUp from '../Pages/AuthPate/SIgnUp';
import MyCars from './../Pages/MyCars';

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayaut />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/available-cars',
        element: <AvaiableCars />,
      },
      {
        path: '/add-car',
        element: (
          <PrivetRoute>
            <AddCar />
          </PrivetRoute>
        ),
      },
      {
        path: '/my-bokings',
        element: (
          <PrivetRoute>
            <MyBookings />
          </PrivetRoute>
        ),
      },
      {
        path: '/my-car',
        element: (
          <PrivetRoute>
            <MyCars />
          </PrivetRoute>
        ),
      },
      {
        path : "/login",
        element: <Login /> 
      },
      {
        path : "/signup",
        element: <SignUp /> 
      }
    ],
  },
]);

export default route;
