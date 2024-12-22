import { BiSun } from 'react-icons/bi';
import { BiMoon } from 'react-icons/bi';
import { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import { ThemeContext } from '../../Context/ThemeContext';

function Navbar() {
  const [openMenu, setMenu] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  // Handle scroll to add blur effect to the navbar
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isSticky ? 'backdrop-blur-lg shadow-lg fixed ' : ''
      } top-0 left-0 w-full z-50 border-b border-gray-200 transition-all`}>
      <div className="wrap">
        <div className="">
          <div className="wrap flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center  gap-3">
              <img className="w-[100px]" src={logo} alt="" />
              <h2 className="font-bold text-2xl">
                R<span className="text-primary">en</span>TC
                <span className="text-primary">ar</span>
              </h2>
            </Link>
            <button
              onClick={() => setMenu(!openMenu)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-text rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-50 hover:text-bg"
              aria-expanded={openMenu}>
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${
                openMenu ? 'block' : 'hidden'
              } w-full lg:block lg:w-auto`}>
              <ul className="font-medium flex flex-col justify-center items-center lg:border-0 p-4 lg:p-0 lg:px-4 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 text-text gap-3 ">
                <NavLink to="/" className="links">
                  Home
                </NavLink>
                <NavLink to="/available-cars" className="links">
                  Avaliable
                </NavLink>
                <NavLink to="/add-car" className="links">
                  Add Car
                </NavLink>
                <NavLink to="/my-car" className="links">
                  My Car
                </NavLink>
                <NavLink to="/my-bokings" className="links">
                 My Bokings
                </NavLink>
              </ul>
              <div className=" lg:hidden flex flex-col gap-3">
                <div
                  className="cursor-pointer mx-auto mt-3 text-text hover:text/80 transition-colors duration-300"
                  onClick={() => setTheme(prev => !prev)}>
                  {theme ? <BiMoon /> : <BiSun />}
                </div>
                <Link to="/login" className="btn">Login</Link>
              </div>
            </div>
            <div className=" hidden lg:flex items-center gap-3">
              <div
                className="cursor-pointer text-text hover:text/80 transition-colors duration-300"
                onClick={() => setTheme(prev => !prev)}>
                {theme ? <BiMoon /> : <BiSun />}
              </div>
              <Link to="/login" className="btn">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
