import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDiskMutation } from '../../store';

interface FormErrors {
  name?: string;
  description?: string;
  imageURL?: string;
  location?: string;
}

export default function useAddDisk() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [createDisk, results] = useCreateDiskMutation();

  useEffect(() => {
    if (results.isLoading) {
      enqueueSnackbar('Creating Disk, please wait...', { variant: 'info' });
    }
  }, [results.isLoading]);

  const handleAddDisk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const diskData = {
      name,
      description,
      location,
      imageURL,
    };

    try {
      const data = await createDisk(diskData).unwrap();
      enqueueSnackbar('Adding disk successfully', { variant: 'success' });
      navigate(`/disks/${data.disk.id}`);
    } catch (error: any) {
      if ('status' in error) {
        if (error.status === 'FETCH_ERROR' || error.status === 500) {
          enqueueSnackbar('Connection error, please refresh the page', {
            variant: 'error',
          });
        }
        if (error.status === 401) {
          enqueueSnackbar('You Must be Logged in to Add a Disk', {
            variant: 'error',
          });
        }
        if (error.status === 400 && error.data.errors) {
          const errorArray: { path: string; message: string }[] =
            error.data.errors;
          const errorObject: FormErrors = {};
          enqueueSnackbar('Adding Disk Failed', {
            variant: 'error',
          });
          errorArray.forEach((errorItem) => {
            errorObject[errorItem.path as keyof FormErrors] = errorItem.message;
          });

          setErrors(errorObject);
        }
      }
    }
  };

  return {
    name,
    setName,
    location,
    setLocation,
    description,
    setDescription,
    errors,
    imageURL,
    setImageURL,
    results,
    handleAddDisk,
    navigate,
  };
}
