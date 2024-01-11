import { useGetAllDisksQuery } from '../../store';
import DiskItem from '../../components/DiskItem';
import Skeleton from '../../components/Skeleton';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DisksIndexPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isError, isSuccess } = useGetAllDisksQuery();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading && <Skeleton className="h-72 w-full" times={6} />}
          {isError && <div className="text-red-600">Error Loading Disks!</div>}
          {isSuccess &&
            (data?.message ? (
              <div className="text-xl m-6 text-white">
                The List is Empty at the Moment,{' '}
                <Link to={'/users/login'} className="text-blue-700">
                  Login
                </Link>{' '}
                and start adding disks.
              </div>
            ) : (
              data.data?.map((disk) => <DiskItem key={disk.id} disk={disk} />)
            ))}
        </div>
      </div>
    </div>
  );
}
