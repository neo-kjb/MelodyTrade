import { useNavigate } from 'react-router-dom';

export default function DiskItem({ disk }) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md mb-4 md:mr-4 flex">
      <img
        src={disk.imageURL}
        alt={disk.name}
        className="w-1/4 object-cover rounded-lg mr-4"
      />
      <div className="flex-1">
        <h2 className="text-lg font-medium text-gray-800 mb-2">{disk.name}</h2>
        <p className="text-gray-600 break-words">{disk.description}</p>
      </div>
      <button
        onClick={() => navigate(`/disks/${disk.id}`)}
        className="absolute bottom-0 right-0 mr-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        {`View ${disk.name} disk`}
      </button>
    </div>
  );
}
