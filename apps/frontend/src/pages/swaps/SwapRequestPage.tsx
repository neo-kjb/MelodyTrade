import React, { useEffect } from 'react';
import { useGetPendingSwapsQuery } from '../../store';
import { useSnackbar } from 'notistack';
import Skeleton from '../../layouts/Skeleton';
import { Link } from 'react-router-dom';
import SwapList from '../../components/swaps/SwapList';
import { getAuthToken } from '../../utils/getAuthToken';
import { Swap } from '@melody-trade/api-interfaces';

export default function SwapRequestPage() {
  const token = getAuthToken();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isError } = useGetPendingSwapsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar('Loading Swap Requests...', { variant: 'info' });
    }
  }, [enqueueSnackbar, isLoading]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Error Loading Swaps. Please Refresh the Page.', {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, isError]);

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

  return (
    <div className="bg-cover bg-center min-h-screen bg-[url(https://wallpaperaccess.com/full/1891379.png)] p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Swap requests
      </h1>
      <div className="max-w-3xl mx-auto bg-white bg-opacity-80 p-6 rounded-md shadow-md">
        {content}
      </div>
    </div>
  );
}
