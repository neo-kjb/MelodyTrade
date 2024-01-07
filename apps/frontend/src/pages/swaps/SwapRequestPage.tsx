import React, { useEffect } from 'react';
import { useGetPendingSwapsQuery } from '../../store';
import { useSnackbar } from 'notistack';
import Skeleton from '../../components/Skeleton';
import { Link } from 'react-router-dom';
import SwapList from '../../components/SwapList';

export default function SwapRequestPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isSuccess, isLoading, isError } = useGetPendingSwapsQuery();

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar('Loading Swaps Requests...', { variant: 'info' });
    }
  }, [enqueueSnackbar, isLoading]);
  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Error Loading Swaps, Please Refresh the Page...', {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, isError]);

  let content;
  if (isLoading) {
    content = <Skeleton className={'h-48 w-full'} times={3} />;
  } else if (isError) {
    content = <div>Error Loading Disks!</div>;
  } else if (data.message) {
    return (
      <div className="text-xl m-6">
        You Don't have any swap request, browse{' '}
        <Link to={'/disks'} className="text-blue-700">
          Disks
        </Link>{' '}
        and start swapping.
      </div>
    );
  } else {
    content = data.data?.map((swap) => <SwapList key={swap.id} swap={swap} />);
  }

  return <div>{content}</div>;
}
