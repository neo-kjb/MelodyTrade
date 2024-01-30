import React from 'react';
import { useGetSwapHistoryQuery } from '../../store';
import { Swap } from '@melody-trade/api-interfaces';
import SwapItem from '../../components/swaps/SwapItem';
import Skeleton from '../../layouts/Skeleton';

export default function useSwapHistory() {
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
        {data?.data?.map((swap: Swap, index: number) => (
          <SwapItem key={index} swap={swap} />
        ))}
      </div>
    );
  }

  if (data?.message === "You don't have accepted swaps") {
    content = (
      <p className="mt-4 text-gray-500">You haven't made any swaps yet.</p>
    );
  }
  return { content };
}
