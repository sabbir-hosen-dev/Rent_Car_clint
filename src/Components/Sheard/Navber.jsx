import { BiSun } from 'react-icons/bi';
import { BiMoon } from 'react-icons/bi';
import { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import { ThemeContext } from '../../Context/ThemeContext';
import useAuthContext from '../../Hook/useAuthContext';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
function Navbar({  openMenu, setMenu}) {

  const [isSticky, setSticky] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuthContext();

  // handle logout

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('user Log Out');
      })
      .catch(err => toast.error(err.message));
  };

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
                R<span className="text-primaryP">en</span>TC
                <span className="text-primaryP">ar</span>
              </h2>
            </Link>
            <button
              onClick={() => setMenu(!openMenu)}
              className="inline-flex items-center z-50 p-2 w-10 h-10 justify-center text-text rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-50 hover:text-bgB"
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
             onClick={() => setMenu(false)}
              className={`${
                openMenu ? 'block' : 'hidden'
              } w-full lg:block lg:w-auto`}>
              <ul className="font-medium flex flex-col justify-center items-center lg:border-0 p-4 lg:p-0 lg:px-4 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 text-text gap-3 ">
                <NavLink
                  onClick={() => setMenu(false)}
                  to="/"
                  className="links">
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setMenu(false)}
                  to="/available-cars"
                  className="links">
                  Avaliable
                </NavLink>
                {user.email && (
                  <>
                    {' '}
                    <NavLink
                      onClick={() => setMenu(false)}
                      to="/add-car"
                      className="links">
                      Add Car
                    </NavLink>
                    <NavLink
                      onClick={() => setMenu(false)}
                      to="/my-car"
                      className="links">
                      My Car
                    </NavLink>
                    <NavLink
                      onClick={() => setMenu(false)}
                      to="/my-bokings"
                      className="links">
                      My Bokings
                    </NavLink>{' '}
                  </>
                )}
              </ul>
              <div className=" lg:hidden flex flex-col gap-3">
                <div
                  className="cursor-pointer mx-auto mt-3 text-text hover:text/80 transition-colors duration-300"
                  onClick={() => {
                    setTheme(prev => !prev), setMenu(false);
                  }}>
                  {theme ? <BiMoon /> : <BiSun />}
                </div>
                {user.email ? (
                  <Link className="m-auto flex gap-3 flex-col items-center">
                    {user?.photo ? (
                      <img
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={user?.name}
                        className="w-10 rounded-full"
                        src={user.photo}
                        alt="User"
                      />
                    ) : (
                      <div className="w-10 h-10 flex justify-center items-center bg-pin rounded-full">
                        <h1 className="font-bold text-white text-2xl">
                          {user?.name?.charAt(0).toUpperCase()}
                        </h1>
                      </div>
                    )}
                    <Link
                      onClick={() => {
                        setMenu(false), handleLogOut();
                      }}
                      to="/login"
                      className="my-btn">
                      Log Out
                    </Link>
                  </Link>
                ) : (
                  <Link
                    onClick={() => setMenu(false)}
                    to="/login"
                    className="my-btn">
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div className=" hidden lg:flex items-center gap-3">
              <div
                className="cursor-pointer text-text hover:text/80 transition-colors duration-300"
                onClick={() => {
                  setTheme(prev => !prev), setMenu(false);
                }}>
                {theme ? <BiMoon /> : <BiSun />}
              </div>
              {user.email ? (
                <Link className="m-auto flex  justify-center items-center gap-3">
                  {user?.photo ? (
                    <img
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.name}
                      className="w-10 rounded-full"
                      src={user.photo}
                      alt="User"
                    />
                  ) : (
                    <div className="w-10 h-10 flex justify-center items-center bg-pin rounded-full">
                      <h1 className="font-bold text-white text-2xl">
                        {user?.name?.charAt(0).toUpperCase()}
                      </h1>
                    </div>
                  )}
                  <Link
                    onClick={() => {
                      setMenu(false), handleLogOut();
                    }}
                    to="/login"
                    className="my-btn">
                    Log Out
                  </Link>
                </Link>
              ) : (
                <Link
                  onClick={() => setMenu(false)}
                  to="/login"
                  className="my-btn">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
