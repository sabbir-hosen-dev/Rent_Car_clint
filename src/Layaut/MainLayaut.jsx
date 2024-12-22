import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber';
import Footer from '../Components/Sheard/Footer';

function MainLayaut() {
  return (
    <>
      <Navber />
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayaut;
