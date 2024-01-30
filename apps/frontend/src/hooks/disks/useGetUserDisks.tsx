import { Item, User } from '@melody-trade/api-interfaces';
import Skeleton from '../../layouts/Skeleton';
import { useGetDisksByUsernameQuery } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function useGetUserDisks(user: User) {
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
        {data?.data?.map((disk: Item, index: number) => (
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

  return { data, content };
}
