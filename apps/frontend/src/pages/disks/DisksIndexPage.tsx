import useGetFilteredDisks from '../../hooks/disks/useGetFilteredDisks';
import SearchBar from '../../layouts/SearchBar';

export default function DisksIndexPage() {
  const {
    handlePageChange,
    totalPages,
    setSearchQuery,
    data,
    currentPage,
    content,
  } = useGetFilteredDisks();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}
      </style>
      <div className="absolute inset-0">
        <img
          src="https://images3.alphacoders.com/174/174989.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="container mx-auto my-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          All Disks ({data?.count || 0})
        </h1>
        <SearchBar query={setSearchQuery} />{' '}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {content}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded ${
                  currentPage === page + 1 && 'bg-blue-700'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
