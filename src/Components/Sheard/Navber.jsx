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

  const links = [
    <NavLink key="home" className="links" to="/">
      Home
    </NavLink>,
    <NavLink key="abour" className="links" to="/abou">
      Home
    </NavLink>,
    <NavLink key="blog" className="links" to="/blog">
      Home
    </NavLink>,
    <NavLink key="h" className="links" to="/h">
      Home
    </NavLink>,
    <NavLink key="hom" className="links" to="/hom">
      Home
    </NavLink>,
  ];

  return (
    <nav
      className={`${
        isSticky ? 'backdrop-blur-md shadow-md fixed ' : ''
      } top-0 left-0 w-full z-50 border-b border-gray-200 transition-all`}>
      <div className="wrap">
        <div className="">
          <div className="wrap flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center  gap-3">
              <img className="w-[100px]" src={logo} alt="" />
              <h2>Rent Car</h2>
            </Link>
            <button
              onClick={() => setMenu(!openMenu)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              } w-full md:block md:w-auto`}>
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {links}
              </ul>
            </div>
            <div className=" flex items-center gap-3">
              <div
                className="cursor-pointer text-text hover:text/80 transition-colors duration-300"
                onClick={() => setTheme(prev => !prev)}>
                {theme ? <BiMoon /> : <BiSun />}
              </div>
              <div className="btn">Login</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
