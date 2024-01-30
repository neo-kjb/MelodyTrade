import { useEffect, useState } from 'react';
import { useLoginUserMutation } from '../../store';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function useLoginUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loginUser, results] = useLoginUserMutation();

  useEffect(() => {
    if (results.isLoading) {
      enqueueSnackbar('Logging in, please wait...', { variant: 'info' });
    }
  }, [results.isLoading]);

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
  return { handleSignupSubmit, errors, email, setEmail, password, setPassword };
}
