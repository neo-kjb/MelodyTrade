import { Link } from 'react-router-dom';

export default function DiskDetails({ disk }) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 flex items-center justify-center bg-white text-black">
        <div className="max-w-md text-center">
          <img src={disk.imageURL} alt="Album Art" />
        </div>
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            {disk.name}
          </h1>

          <form className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Artist Name:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
                {disk.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location to Pick:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
                {disk.location}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <p className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
                {disk.description}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Disk Owner:
              </label>
              <Link
                to={`/users/${disk.userId}`}
                className="mt-1 p-2 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-blue-500 hover:text-blue-300"
              >
                {disk.user.username}
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Swap Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
