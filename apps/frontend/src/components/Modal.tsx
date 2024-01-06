import { useState } from 'react';
import { useGetCurUserQuery, useGetDisksByUsernameQuery } from '../store';
import DiskImage from './DiskImage';
import { Link } from 'react-router-dom';

export default function Modal({ onClose, onSelect }) {
  const [showModal, setShowModal] = useState(false);
  const [sentDisk, setSentDisk] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const { data } = useGetCurUserQuery();

  const handleSetSelectedDisk = (disk) => {
    setIsSelected(true);
    setSentDisk(disk);
  };
  const handleSelectDiskToSwap = () => {
    onSelect(sentDisk);
    onClose();
  };

  const {
    data: disks,
    isLoading,
    isFetching,
    isError,
  } = useGetDisksByUsernameQuery(data?.currUserName);

  let content;

  if (isFetching || isLoading) {
    content = <p>Loading your disks...</p>;
  } else if (isError) {
    content = <div>Error Loading Disks!</div>;
  } else if (disks.message === 'No disks found') {
    content = (
      <p>
        You don't have any disk to swap,{' '}
        <Link to={'/disks/new'} className="text-blue-700">
          add disk
        </Link>{' '}
        and start swapping.
      </p>
    );
  } else {
    content = disks.data?.map((disk) => (
      <DiskImage key={disk.id} disk={disk} onSelect={handleSetSelectedDisk} />
    ));
  }

  return (
    <>
      <div className="flex">
        <button
          className="w-6/12 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Select Disk to Swap
        </button>
        <button
          className="w-6/12 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Your Disks</h3>
                </div>

                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-5 gap-4">{content}</div>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {isSelected && (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSelectDiskToSwap}
                    >
                      Swap Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-32 w-32 ...">
            <div className="opacity-25 fixed inset-0 z-40 bg-black	"></div>
          </div>
        </>
      ) : null}
    </>
  );
}
