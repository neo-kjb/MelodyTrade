import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useGetCurUserQuery } from '../../store';
import { getAuthToken } from '../../utils/getAuthToken';
import { Item } from '@melody-trade/api-interfaces';
import useDeleteDisk from '../../hooks/disks/useDeleteDisk';
import useCreateSwap from '../../hooks/swaps/useCreateSwap';

export default function DiskDetails(props: { disk: Item }) {
  const { disk } = props;
  const navigate = useNavigate();
  const token = getAuthToken();

  const [isSwapping, setIsSwapping] = useState(false);
  const [isDisplaySwapButton, setIsDisplaySwapButton] = useState(true);

  const { data } = useGetCurUserQuery(token);

  const { deleteDiskResults, handleDeleteDisk } = useDeleteDisk(disk);
  const { handleSelectDiskToSwap } = useCreateSwap(disk);

  const openModal = () => {
    setIsSwapping(true);
  };

  useEffect(() => {
    if (data?.currUserId === disk.userId || !token) {
      setIsDisplaySwapButton(false);
    }
  }, [data?.currUserId, disk.userId, token]);

  return (
    <div className="relative flex items-center min-h-screen bg-gray-50">
      <div className="absolute inset-0 bg-[url(https://cdn.wallpapersafari.com/50/13/jF6QLc.jpg)] bg-cover bg-center"></div>
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl relative">
        <div className=" flex flex-col md:flex-row ">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src={disk.imageURL}
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 ">
            <form className="w-full">
              <div className="flex justify-center">
                <img
                  src="https://www.svgrepo.com/show/507644/disk.svg"
                  alt="img"
                  className="w-20 h-20 text-blue-600"
                />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                {disk.name}
              </h1>
              <div className="mt-4">
                <label htmlFor="name" className="block text-sm">
                  Disk title
                </label>
                <p className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600">
                  {disk.name}
                </p>
              </div>
              <div>
                <label htmlFor="location" className="block mt-4 text-sm">
                  Location to Pick
                </label>
                <p className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600">
                  {disk.location}
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block mt-4 text-sm">
                  Description
                </label>
                <p className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600">
                  {disk.description}
                </p>
              </div>

              <div>
                <label className="block mt-4 text-sm">Disk Owner:</label>
                <Link
                  to={`/users/${disk.userId}`}
                  className="mt-1 p-2 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-blue-500 hover:text-blue-300"
                >
                  {disk.user && disk.user.username}
                </Link>
              </div>

              {isDisplaySwapButton && (
                <div>
                  <button
                    type="button"
                    onClick={openModal}
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                  >
                    Swap Now
                  </button>
                </div>
              )}
              {data?.currUserId === disk.userId && (
                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/disks/${disk.id}/edit`)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    disabled={deleteDiskResults.isLoading}
                    type="button"
                    onClick={handleDeleteDisk}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400"
                  >
                    Delete
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
    </div>
  );
}
