import { Swap } from '@melody-trade/api-interfaces';
import { useNavigate } from 'react-router-dom';

export default function SwapItem(props: { swap: Swap }) {
  const navigate = useNavigate();
  const { swap } = props;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-105 flex flex-col items-center">
      <div className="flex items-center mb-4">
        <div
          onClick={() => {
            navigate(`/disks/${swap.receivedItem.id}`);
          }}
          className="relative cursor-pointer mr-2"
        >
          <img
            src={swap.receivedItem.imageURL}
            alt={swap.receivedItem.name}
            className="w-40 h-40 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
              {swap.receivedItem.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl">&#8596;</span>
        </div>
        <div
          onClick={() => {
            navigate(`/disks/${swap.sentItem.id}`);
          }}
          className="relative cursor-pointer ml-2"
        >
          <img
            src={swap.sentItem.imageURL}
            alt={swap.sentItem.name}
            className="w-40 h-40 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-lg font-semibold bg-gray-800 bg-opacity-75 px-4 py-2 rounded">
              {swap.sentItem.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
