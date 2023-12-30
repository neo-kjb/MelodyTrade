import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          end
        >
          <img
            src="https://www.svgrepo.com/show/121067/headphone.svg"
            className="h-8"
            alt="Melody Trade Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Melody Trade
          </span>
        </NavLink>
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
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
          className={`w-full md:block md:w-auto ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                aria-current="page"
                end
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/disks/new"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                end
              >
                Add Disk
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/swaps"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                aria-current="page"
                end
              >
                Swap Requests
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users/:userId"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                end
              >
                My Account
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users/login"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                end
              >
                Log In
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users/signup"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                end
              >
                Sign Up
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users/logout"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
                end
              >
                Log out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
