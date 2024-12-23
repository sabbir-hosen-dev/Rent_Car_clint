import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber';
import Footer from '../Components/Sheard/Footer';
import useAuthContext from '../Hook/useAuthContext';
import Loadding from '../Pages/Loadding';
import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function MainLayaut() {
  const { loadding } = useAuthContext();
  const [openMenu, setMenu] = useState(false);

  return (
    <>
      {loadding ? (
        <Loadding />
      ) : (
        <>
          <Tooltip className="z-50" id="my-tooltip" />
          <Toaster position="top-right" />

          <Navber openMenu={openMenu} setMenu={setMenu} />
          <div  onClick={() => setMenu(false)} className="min-h-[75.3vh]">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default MainLayaut;
