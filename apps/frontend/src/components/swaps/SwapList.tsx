import { useEffect, useState } from 'react';
import { useGetCurUserQuery } from '../../store';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/getAuthToken';
import { Swap } from '@melody-trade/api-interfaces';
import useCancelSwap from '../../hooks/swaps/useCancelSwap';
import useAcceptSwap from '../../hooks/swaps/useAcceptSwap';
import useRejectSwap from '../../hooks/swaps/useRejectSwap';

const SwapList = (props: { swap: Swap }) => {
  const { swap } = props;
  const token = getAuthToken();
  const navigate = useNavigate();
  const [isSender, setIsSender] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);
  const { data, isSuccess } = useGetCurUserQuery(token);

  const { handleCancelRequest } = useCancelSwap(swap);
  const { handleAcceptRequest } = useAcceptSwap(swap);
  const { handleRejectRequest } = useRejectSwap(swap);

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
