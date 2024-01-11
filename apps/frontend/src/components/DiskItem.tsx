import { useNavigate } from 'react-router-dom';

export default function DiskItem({ disk }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg mb-4 transform transition duration-300 hover:scale-105">
      <img
        src={disk.imageURL}
        alt={disk.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">{disk.name}</h2>
        <p className="text-gray-200 break-words mb-4">{disk.description}</p>
        <button
          onClick={() => navigate(`/disks/${disk.id}`)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          View {disk.name} Disk
        </button>
      </div>
    </div>
  );
}
