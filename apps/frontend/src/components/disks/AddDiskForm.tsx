import useAddDisk from '../../hooks/disks/useAddDisk';

export default function AddDiskForm() {
  const {
    handleAddDisk,
    navigate,
    name,
    setName,
    location,
    setLocation,
    description,
    setDescription,
    errors,
    imageURL,
    setImageURL,
    results,
  } = useAddDisk();

  return (
    <div className="flex items-center min-h-screen bg-gray-50 bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVp6mgc43xfhyPzHYNYwia_BMvVYH36-zDnjbv8a9-6TejiCq-ixONzSuhw5_-wdbvSww&usqp=CAU)]">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://www.creativefabrica.com/wp-content/uploads/2022/12/22/Aya-Takano-4K-Music-Record-Painting-53980310-1.png"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={handleAddDisk} className="w-full">
              <div className="flex justify-center">
                <img
                  src="https://www.svgrepo.com/show/507644/disk.svg"
                  alt="img"
                  className="w-20 h-20 text-blue-600"
                />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Add disk
              </h1>

              <div className="mt-4">
                <label htmlFor="name" className="block text-sm">
                  Disk Title
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Disk Title"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block mt-4 text-sm">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Description"
                  type="text"
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="imageURL" className="block mt-4 text-sm">
                  Disk Image URL
                </label>
                <input
                  value={imageURL}
                  onChange={(e) => {
                    setImageURL(e.target.value);
                  }}
                  id="imageURL"
                  name="imageURL"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="ImageURL"
                  type="url"
                  required
                />
              </div>
              {errors.imageURL && (
                <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>
              )}
              <div>
                <label htmlFor="location" className="block mt-4 text-sm">
                  Location to Pick
                </label>
                <input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  id="location"
                  name="location"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Location"
                  type="text"
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
              <button
                disabled={results.isLoading}
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Add Disk
              </button>
              <button
                onClick={() => navigate(`/disks`)}
                type="button"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
