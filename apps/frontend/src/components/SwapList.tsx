import React, { useEffect, useState } from 'react';
import {
  useCancelSwapMutation,
  useGetCurUserQuery,
  useRejectSwapMutation,
  useAcceptSwapMutation,
} from '../store';
import { enqueueSnackbar } from 'notistack';
import { error } from 'console';

const SwapList = ({ swap }) => {
  const [isSender, setIsSender] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);
  const { data, isSuccess } = useGetCurUserQuery();

  const [cancelSwap, cancelResults] = useCancelSwapMutation();
  const [acceptSwap, acceptResults] = useAcceptSwapMutation();
  const [rejectSwap, rejectResults] = useRejectSwapMutation();

  useEffect(() => {
    let currUserId;
    if (isSuccess) {
      currUserId = data.currUserId;
      if (currUserId === swap.senderId) {
        setIsSender(true);
      }
      if (currUserId === swap.receiverId) {
        setIsReceiver(true);
      }
    }
  }, [isSuccess, data?.currUserId, swap.senderId, swap.receiverId]);

  const handleCancelRequest = () => {
    cancelSwap(swap.id);
  };
  console.log(cancelResults);
  const handleAcceptRequest = () => {
    acceptSwap(swap.id);
  };
  const handleRejectRequest = () => {
    rejectSwap(swap.id);
  };

  useEffect(() => {
    if (cancelResults.isSuccess) {
      enqueueSnackbar('Swap request canceled successfully', {
        variant: 'success',
      });
    }
    if (cancelResults.isLoading) {
      enqueueSnackbar('Canceling swap request...', { variant: 'info' });
    }
    if (cancelResults.isError) {
      enqueueSnackbar(cancelResults.error?.data.message, { variant: 'error' });
    }
    if (acceptResults.isSuccess) {
      enqueueSnackbar('Swap request accepted successfully', {
        variant: 'success',
      });
    }
    if (acceptResults.isLoading) {
      enqueueSnackbar('Accepting swap request...', { variant: 'info' });
    }
    if (acceptResults.isError) {
      enqueueSnackbar(acceptResults.error?.data.message, { variant: 'error' });
    }
    if (rejectResults.isSuccess) {
      enqueueSnackbar('Swap request rejected successfully', {
        variant: 'success',
      });
    }
    if (rejectResults.isLoading) {
      enqueueSnackbar('Rejecting swap request...', { variant: 'info' });
    }
    if (rejectResults.isError) {
      enqueueSnackbar(rejectResults.error?.data.message, { variant: 'error' });
    }
  }, [
    cancelResults.isSuccess,
    cancelResults.isLoading,
    cancelResults.isError,
    cancelResults.error?.data.message,
    acceptResults.isSuccess,
    acceptResults.isLoading,
    acceptResults.isError,
    acceptResults.error?.data.message,
    rejectResults.isSuccess,
    rejectResults.isLoading,
    rejectResults.isError,
    rejectResults.error?.data.message,
  ]);
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row items-center p-4 border border-gray-300 rounded-md">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          <img
            src={swap.receivedItem.imageURL}
            alt="Item 1"
            className="w-16 h-16 object-cover rounded"
          />
          <p className="text-lg font-semibold mt-2">{swap.receivedItem.name}</p>
        </div>
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          <img
            src={swap.sentItem.imageURL}
            alt="Item 2"
            className="w-16 h-16 object-cover rounded"
          />
          <p className="text-lg font-semibold mt-2">{swap.sentItem.name}</p>
        </div>
        <div className="flex-grow" />
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {isSender && (
            <button
              onClick={handleCancelRequest}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Cancel
            </button>
          )}
          {isReceiver && (
            <button
              onClick={handleRejectRequest}
              className="bg-yellow-500 text-white px-3 py-2 rounded"
            >
              Reject
            </button>
          )}
          {isReceiver && (
            <button
              onClick={handleAcceptRequest}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapList;
