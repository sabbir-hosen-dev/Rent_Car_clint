import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber';

function MainLayaut() {
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
}

export default MainLayaut;
