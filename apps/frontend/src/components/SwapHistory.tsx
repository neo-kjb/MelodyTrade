import React from 'react';
import { useGetSwapHistoryQuery } from '../store';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';

export default function SwapHistory({ user }) {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetSwapHistoryQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  let content;
  if (isLoading) {
    content = <Skeleton times={1} className="w-full h-20" />;
  } else if (isError) {
    content = <p className="mt-4 text-red-500">Error loading swaps.</p>;
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col items-center">
        {data?.data?.map((swap, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-105 flex flex-col items-center"
          >
            <div className="flex items-center mb-4">
              <div
                onClick={() => {
                  navigate(`/disks/${swap.receivedItem.id}`);
                }}
                className="relative cursor-pointer mr-2"
              >
                <img
                  src={swap.receivedItem.imageURL}
                  alt={swap.receivedItem.name}
                  className="w-40 h-40 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
                    {swap.receivedItem.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl">&#8596;</span>
              </div>
              <div
                onClick={() => {
                  navigate(`/disks/${swap.sentItem.id}`);
                }}
                className="relative cursor-pointer ml-2"
              >
                <img
                  src={swap.sentItem.imageURL}
                  alt={swap.sentItem.name}
                  className="w-40 h-40 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
                    {swap.sentItem.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data?.message === "You don't have accepted swaps") {
    content = (
      <p className="mt-4 text-gray-500">You haven't made any swaps yet.</p>
    );
  }

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Swap History</h2>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="flex justify-center mt-4">{content}</div>
    </div>
  );
}
