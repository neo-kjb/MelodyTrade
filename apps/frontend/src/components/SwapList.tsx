import { useEffect, useState } from 'react';
import {
  useCancelSwapMutation,
  useGetCurUserQuery,
  useRejectSwapMutation,
  useAcceptSwapMutation,
} from '../store';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/getAuthToken';
import { Swap } from '@melody-trade/api-interfaces';

const SwapList = (props: { swap: Swap }) => {
  const { swap } = props;
  const token = getAuthToken();
  const navigate = useNavigate();
  const [isSender, setIsSender] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);
  const { data, isSuccess } = useGetCurUserQuery(token);

  const [cancelSwap, cancelResults] = useCancelSwapMutation();
  const [acceptSwap, acceptResults] = useAcceptSwapMutation();
  const [rejectSwap, rejectResults] = useRejectSwapMutation();

  useEffect(() => {
    let currUserId;
    if (isSuccess) {
      currUserId = data.currUserId;
      if (currUserId === swap.sentItem.userId) {
        setIsSender(true);
      }
      if (currUserId === swap.receivedItem.userId) {
        setIsReceiver(true);
      }
    }
  }, [
    isSuccess,
    data.currUserId,
    swap.sentItem.userId,
    swap.receivedItem.userId,
  ]);

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
    <div className="flex flex-col space-y-4  p-6 rounded-lg shadow-lg mb-4 transform transition duration-300 hover:scale-105">
      <div className="flex flex-col sm:flex-row items-center p-4 border border-gray-500 rounded-md">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 m-auto ml-2">
          <div
            onClick={() => navigate(`/disks/${swap.receivedItem.id}`)}
            className="relative cursor-pointer "
          >
            <img
              src={swap.receivedItem.imageURL}
              alt="Item 1"
              className="w-40 h-40 object-cover rounded shadow-md transition-transform transform hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
                {swap.receivedItem.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl">&#8596;</span>
        </div>
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 m-auto ml-2">
          <div
            className="relative cursor-pointer "
            onClick={() => navigate(`/disks/${swap.sentItem.id}`)}
          >
            <img
              src={swap.sentItem.imageURL}
              alt="Item 1"
              className="w-40 h-40 object-cover rounded shadow-md transition-transform transform hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
                {swap.sentItem.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {isSender && (
            <button
              onClick={handleCancelRequest}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          )}
          {isReceiver && (
            <button
              onClick={handleRejectRequest}
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-700"
            >
              Reject
            </button>
          )}
          {isReceiver && (
            <button
              onClick={handleAcceptRequest}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700"
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
