import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditDiskMutation } from '../../store';
import { enqueueSnackbar } from 'notistack';
import { Item } from '@melody-trade/api-interfaces';

interface FormErrors {
  name?: string;
  description?: string;
  imageURL?: string;
  location?: string;
}

export default function useEditDisk(disk: Item) {
  const navigate = useNavigate();

  const [name, setName] = useState(disk.name);
  const [description, setDescription] = useState(disk.description);
  const [location, setLocation] = useState(disk.location);
  const [imageURL, setImageURL] = useState(disk.imageURL);
  const [errors, setErrors] = useState<FormErrors>({});

  const [editDisk, results] = useEditDiskMutation();

  const handleEditDisk = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDiskData = {
      name,
      description,
      location,
      imageURL,
      id: disk.id,
    };
    editDisk(newDiskData);
  };

  useEffect(() => {
    if (results.isError) {
      if ('status' in results.error) {
        if (results.error?.data?.message === 'Invalid input') {
          const errorArray: { path: string; message: string }[] =
            results.error?.data?.errors || [];
          const errorObject: FormErrors = {};
          enqueueSnackbar('Editing Disk Failed', {
            variant: 'error',
          });
          errorArray.forEach((errorItem) => {
            errorObject[errorItem.path as keyof FormErrors] = errorItem.message;
          });
          setErrors(errorObject);
        }
        if (
          results.error?.status === 400 ||
          results.error?.status === 404 ||
          results.error?.status === 401
        ) {
          enqueueSnackbar(results.error?.data?.message || 'An error occurred', {
            variant: 'error',
          });
        }
      }
    }

    if (results.isSuccess) {
      enqueueSnackbar('Disk Edited Successfully', { variant: 'success' });
      navigate(`/disks/${disk.id}`);
    }
  }, [
    results.error,
    disk.id,
    navigate,
    results.error?.data?.errors,
    results.error?.data?.message,
    results.error?.status,
    results.isError,
    results.isSuccess,
  ]);

  return {
    handleEditDisk,
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
  };
}
