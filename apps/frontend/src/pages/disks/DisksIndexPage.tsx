import { useGetAllDisksQuery } from '../../store';
import DiskItem from '../../components/DiskItem';
import Skeleton from '../../components/Skeleton';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DisksIndexPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, isSuccess } = useGetAllDisksQuery('');

  useEffect(() => {
    if (!isLoading) {
      enqueueSnackbar('Loading Disks...', { variant: 'info' });
    }
    if (isError) {
      enqueueSnackbar('Error Loading Disks, Please Refresh the Page...', {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, isError, isLoading]);

  const filteredDisks = isSuccess
    ? data?.data?.filter((disk) =>
        disk.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}
      </style>
      <div className="absolute inset-0">
        <img
          src="https://images3.alphacoders.com/174/174989.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="container mx-auto my-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          All Disks ({data?.count || 0})
        </h1>
        <div className="mb-3">
          <input
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mx-auto relative m-0 block w-2/4 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-200 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            id="search"
            placeholder="Search..."
          />
        </div>{' '}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading && <Skeleton className="h-72 w-full" times={6} />}
          {isError && <div className="text-red-600">Error Loading Disks!</div>}
          {isSuccess &&
            (filteredDisks.length === 0 ? (
              <div className="text-xl m-6 text-white">
                No disks found.{' '}
                <Link to={'/users/login'} className="text-blue-700">
                  Login
                </Link>{' '}
                and start adding disks.
              </div>
            ) : (
              filteredDisks.map((disk) => (
                <DiskItem key={disk.id} disk={disk} />
              ))
            ))}
        </div>
      </div>
    </div>
  );
}
