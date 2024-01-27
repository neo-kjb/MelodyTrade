import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getAuthToken } from '../utils/getAuthToken';
import { useGetCurUserQuery, useLogoutUserMutation } from '../store';

export default function MainNavigation() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [logout] = useLogoutUserMutation();
  const { data } = useGetCurUserQuery(token);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const confirm = window.confirm('Are You Sure ?');
    if (confirm) {
      localStorage.removeItem('token');
      logout('');
      navigate('/');
      enqueueSnackbar('Logout Successfully', { variant: 'success' });
    } else {
      return;
    }
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
                to="/disks"
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

            {token && (
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
            )}

            {token && (
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
            )}

            {token && data && (
              <li>
                <NavLink
                  to={`/users/${data?.currUserId}`}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-700 font-bold'
                      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }
                  end
                >
                  {data?.currUserName}
                </NavLink>
              </li>
            )}

            {!token && (
              <li>
                <NavLink
                  to="/users/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-700 font-bold'
                      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }
                >
                  Log In
                </NavLink>
              </li>
            )}

            {!token && (
              <li>
                <NavLink
                  to="/users/signup"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-700 font-bold'
                      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  onClick={logoutHandler}
                  to={'/'}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Log out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
