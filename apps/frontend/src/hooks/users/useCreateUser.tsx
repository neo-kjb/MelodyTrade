import { useEffect, useState } from 'react';
import { useAddUserMutation } from '../../store';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface ErrorObject {
  username?: string;
  email?: string;
  password?: string;
}

export default function useCreateUser() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorObject>({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, results] = useAddUserMutation();

  useEffect(() => {
    if (results.isLoading) {
      enqueueSnackbar('Creating user, please wait...', { variant: 'info' });
    }
  }, [results.isLoading]);

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    try {
      const data = await addUser(userData).unwrap();
      console.log(data);

      localStorage.setItem('token', data.accessToken);
      enqueueSnackbar('User created successfully', { variant: 'success' });
      navigate('/');
    } catch (error: any) {
      if (error.status === 'FETCH_ERROR' || error.status === 500) {
        enqueueSnackbar('Connection error, please refresh the page', {
          variant: 'error',
        });
      }
      if (error.status === 400 && error.data.errors) {
        const errorArray = error.data.errors;
        const errorObject: ErrorObject = {};
        enqueueSnackbar('Creating User Failed', {
          variant: 'error',
        });
        errorArray.forEach((errorItem: { path: string; message: string }) => {
          errorObject[errorItem.path as keyof ErrorObject] = errorItem.message;
        });

        setErrors(errorObject);
      }
    }
  };

  return {
    handleSignupSubmit,
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    errors,
  };
}
