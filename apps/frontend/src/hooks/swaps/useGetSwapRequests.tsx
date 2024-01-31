import { useEffect } from 'react';
import { useGetPendingSwapsQuery } from '../../store';
import Skeleton from '../../layouts/Skeleton';
import { Link } from 'react-router-dom';
import SwapList from '../../components/swaps/SwapList';
import { getAuthToken } from '../../utils/getAuthToken';
import { Swap } from '@melody-trade/api-interfaces';
import { enqueueSnackbar } from 'notistack';

export default function useGetSwapRequests() {
  const token = getAuthToken();
  const { data, isLoading, isError } = useGetPendingSwapsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar('Loading Swap Requests...', { variant: 'info' });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Error Loading Swaps. Please Refresh the Page.', {
        variant: 'error',
      });
    }
  }, [isError]);

  let content;
  if (isLoading) {
    content = <Skeleton className="mx-auto mt-10" times={3} />;
  } else if (isError) {
    content = (
      <div className="flex items-center justify-center ">
        <div className="text-center text-red-500 p-4">
          Oops! Something went wrong. Please refresh the page.
        </div>
      </div>
    );
  } else if (data.message) {
    content = (
      <div className="ml-10 items-center justify-center text-dark text-xl">
        You don't have any swap requests. Browse{' '}
        <Link to="/disks" className="text-blue-700">
          Disks
        </Link>{' '}
        and start swapping.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-4">
        {data.data?.map((swap: Swap) => (
          <SwapList key={swap.id} swap={swap} />
        ))}
      </div>
    );
  }
  return { content };
}
