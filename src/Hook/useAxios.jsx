import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthContext from './useAuthContext';


// https://rent-car-server-beta.vercel.app
// http://localhost:8000

const axiosInt = axios.create({
  baseURL: 'https://rent-car-server-beta.vercel.app',
  withCredentials: true,
   
});



const axiosIntSecure = axios.create({
  baseURL: 'https://rent-car-server-beta.vercel.app',
  withCredentials: true,
  // credentials: true,
   
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, setUser,user } = useAuthContext();

  useEffect(() => {
    const interceptor = axiosIntSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
        console.error('Error caught by Axios interceptor:', error.response || error);
        console.log(error)

        // const status = error.response?.status;
        if (error.status === 401 || error.status === 403) {
          try {
            console.log('Logging out...');
             logOut()
            .then(() => {
              axiosInt.post("/logout")
              .then(() => {
                setUser({
                  ...user,
                  name: '',
                  email: '',
                  photo: '',
                });
                navigate('/login', { replace: true });
                return;
              })
              .catch(err => console.log(err))
            })
            
          } catch (logoutError) {
            console.error('Error during logout:', logoutError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosIntSecure.interceptors.response.eject(interceptor);
    };
  }, []);

  return axiosIntSecure;
};

export { axiosInt, useAxiosSecure };
