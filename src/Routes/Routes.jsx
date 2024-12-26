import { createBrowserRouter } from 'react-router-dom';
import MainLayaut from '../Layaut/MainLayaut';
import NotFound from '../Pages/NotFound';
import Home from '../Pages/Home';
import PrivetRoute from './PrivetRoutes';
import AvaiableCars from '../Pages/AvaiableCars';
import AddCar from '../Pages/AddCar';
import Login from '../Pages/AuthPate/Login';
import SignUp from '../Pages/AuthPate/SIgnUp';
import MyCars from './../Pages/MyCars';
import BookingRequest from '../Pages/BookingRequest';
import DailyRentalPrices from '../Pages/DailyRentalPrices';
import MyBookings from '../Pages/MyBookings';
import CarDetails from '../Pages/CarDetails';

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
        path: '/booking-request',
        element: (
          <PrivetRoute>
            <BookingRequest />
          </PrivetRoute>
        ),
      },
      {
        path: '/DailyRentalPrices',
        element: (
          <PrivetRoute>
            <DailyRentalPrices />
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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/cars/:id',
        element: <CarDetails />,
      },
    ],
  },
]);

export default route;
