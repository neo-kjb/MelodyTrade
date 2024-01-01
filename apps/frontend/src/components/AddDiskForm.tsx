import { useState, useEffect, FormEvent } from 'react';
import { useCreateDiskMutation } from '../store';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errors, setErrors] = useState({});
  const [createDisk, results] = useCreateDiskMutation();

  useEffect(() => {
    if (results.isLoading) {
      enqueueSnackbar('Creating Disk, please wait...', { variant: 'info' });
    }
  }, [results.isLoading, enqueueSnackbar]);

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const diskData = {
      name,
      description,
      location,
      imageURL,
    };

    try {
      const data = await createDisk(diskData).unwrap();
      console.log(data);
      enqueueSnackbar('Adding disk successfully', { variant: 'success' });
      navigate(`/disks/${data.disk.id}`);
    } catch (error) {
      console.log(error);

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
        const errorArray = error.data.errors;
        const errorObject = {};
        enqueueSnackbar('Adding Disk Failed', {
          variant: 'error',
        });
        errorArray.forEach((errorItem) => {
          errorObject[errorItem.path] = errorItem.message;
        });

        setErrors(errorObject);
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50">
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
                <img
                  src="https://www.svgrepo.com/show/507644/disk.svg"
                  alt="img"
                  className="w-20 h-20 text-blue-600"
                />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Add disk
              </h1>

              <div className="mt-4">
                <label htmlFor="name" className="block text-sm">
                  Artist Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Artist Name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block mt-4 text-sm">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Description"
                  type="text"
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="imageURL" className="block mt-4 text-sm">
                  Disk Image URL
                </label>
                <input
                  value={imageURL}
                  onChange={(e) => {
                    setImageURL(e.target.value);
                  }}
                  id="imageURL"
                  name="imageURL"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="ImageURL"
                  type="url"
                  required
                />
              </div>
              {errors.imageURL && (
                <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>
              )}
              <div>
                <label htmlFor="location" className="block mt-4 text-sm">
                  Location to Pick
                </label>
                <input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  id="location"
                  name="location"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Location"
                  type="text"
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Add Disk
              </button>
              <button
                onClick={() => navigate(`/disks`)}
                type="button"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
