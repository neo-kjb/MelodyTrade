import { useState, useEffect } from 'react';
import { useLoginUserMutation } from '../../store';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loginUser, results] = useLoginUserMutation();

  useEffect(() => {
    if (results.isLoading) {
      enqueueSnackbar('Logging in, please wait...', { variant: 'info' });
    }
  }, [results.isLoading, enqueueSnackbar]);

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData).unwrap();

      localStorage.setItem('token', data.accessToken);
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      if ('status' in error) {
        if (error.status === 'FETCH_ERROR' || error.status === 500) {
          enqueueSnackbar('Connection error, please refresh the page', {
            variant: 'error',
          });
        }
        if (
          error.status === 401 ||
          error.status === 404 ||
          error.status === 400
        ) {
          setErrors('Incorrect Email or Password');
          enqueueSnackbar('Login Failed', {
            variant: 'error',
          });
        }
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50 bg-[url(https://wallpaperaccess.com/full/1891379.png)] bg-cover bg-center">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={handleSignupSubmit} className="w-full">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Login
              </h1>
              {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mt-4 text-sm">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Password"
                  type="password"
                  required
                />
              </div>
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Login
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Dont have an account yet?{' '}
                  <Link
                    to="/users/signup"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
