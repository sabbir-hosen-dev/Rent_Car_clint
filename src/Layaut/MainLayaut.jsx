import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber';
import Footer from '../Components/Sheard/Footer';
import useAuthContext from '../Hook/useAuthContext';
import Loadding from '../Pages/Loadding';
import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';


function MainLayaut() {
  const { loadding } = useAuthContext();
  return (
    <>
      {loadding ? (
        <Loadding />
      ) : (
        <>
        <Tooltip id="my-tooltip" />
        <Toaster position='top-right' />
        
          <Navber />
          <div className="min-h-[75.3vh]">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default MainLayaut;
