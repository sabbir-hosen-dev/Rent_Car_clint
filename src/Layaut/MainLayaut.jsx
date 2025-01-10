import { Outlet, useLocation } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber';
import Footer from '../Components/Sheard/Footer';
import useAuthContext from '../Hook/useAuthContext';
import Loadding from '../Pages/Loadding';
import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function MainLayaut() {
  const { loadding } = useAuthContext();
  const [openMenu, setMenu] = useState(false);

  const [nav, setNev] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if(location.pathname == "/"){
      setNev(false);
    }else{
      setNev(true)
    }
  },[location])

  return (
    <>
      {loadding ? (
        <Loadding />
      ) : (
        <>
          <Tooltip className="z-50" id="my-tooltip" />
          <Toaster position="top-right" />

          {nav && <Navber openMenu={openMenu} setMenu={setMenu} />}
          <div onClick={() => setMenu(false)} className="min-h-[75.3vh]">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default MainLayaut;
