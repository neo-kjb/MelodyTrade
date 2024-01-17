import React from 'react';
import { useGetDisksByUsernameQuery } from '../store';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';

export default function UserDisks({ user }) {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetDisksByUsernameQuery(
    user.username,
    { refetchOnMountOrArgChange: true }
  );
  let content;
  if (isLoading) {
    content = <Skeleton times={1} className="w-full h-20" />;
  }

  if (isError) {
    content = <p className="mt-4 text-red-500">Error loading disks</p>;
  }

  if (isSuccess) {
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.data?.map((disk, index) => (
          <div
            key={index}
            onClick={() => navigate(`/disks/${disk.id}`)}
            className="flex flex-col items-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 "
          >
            <img
              src={disk.imageURL}
              alt={`${disk.name} disk`}
              className="w-32 h-32 rounded-full mb-2"
            />
            <div className="bg-gray-500 rounded-md p-2">
              <p className="text-base font-bold text-white">{disk.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (data?.message === 'No disks found') {
    content = <p className="mt-4 text-gray-500">No disks available.</p>;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        Disks {`(${data?.count || 0})`}
      </h2>
      <hr className="my-2" />
      <div className="flex justify-center mt-4">{content}</div>
    </div>
  );
}
