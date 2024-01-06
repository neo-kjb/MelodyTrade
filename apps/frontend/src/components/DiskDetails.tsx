import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useCreateSwapMutation, useGetCurUserQuery } from '../store';
import { useSnackbar } from 'notistack';
import { getAuthToken } from '../utils/getAuthToken';

export default function DiskDetails({ disk }) {
  const token = getAuthToken();
  const { enqueueSnackbar } = useSnackbar();
  const [isSwapping, setIsSwapping] = useState(false);
  const [createSwap, results] = useCreateSwapMutation();
  const [isDisplaySwapButton, setIsDisplaySwapButton] = useState(true);

  const { data } = useGetCurUserQuery();

  const handleSelectDiskToSwap = (senderDisk) => {
    const swapData = {
      sentItemId: senderDisk.id,
      receivedItemId: disk.id,
    };
    createSwap(swapData);
  };
  useEffect(() => {
    if (results.isSuccess) {
      enqueueSnackbar('Swap request sent successfully', {
        variant: 'success',
      });
    }
  }, [enqueueSnackbar, results.isSuccess]);
  useEffect(() => {
    if (results.error?.data?.message) {
      enqueueSnackbar(results.error.data.message, {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, results.error?.data?.message]);

  const openModal = () => {
    setIsSwapping(true);
  };

  useEffect(() => {
    if (data?.currUserId === disk.userId || !token) {
      setIsDisplaySwapButton(false);
    }
  }, [data?.currUserId, disk.userId, token]);

  return (
    <div className="flex flex-col lg:flex-row mt-10">
      <div className="lg:w-1/2 flex items-center justify-center bg-white text-black">
        <div className="max-w-md text-center">
          <img src={disk.imageURL} alt="Album Art" />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6 m-auto">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center break-words">
            {disk.name}
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Disk Title:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 break-words">
                {disk.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location to Pick:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 break-words">
                {disk.location}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 break-words">
                {disk.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Disk Owner:
              </label>
              <Link
                to={`/users/${disk.userId}`}
                className="mt-1 p-2 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-blue-500 hover:text-blue-300"
              >
                {disk.user.username}
              </Link>
            </div>

            {isDisplaySwapButton && (
              <div>
                <button
                  type="button"
                  onClick={openModal}
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Swap Now
                </button>
              </div>
            )}
            {isSwapping && (
              <Modal
                onSelect={handleSelectDiskToSwap}
                onClose={() => setIsSwapping(false)}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
