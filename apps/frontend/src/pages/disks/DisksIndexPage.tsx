import { useGetAllDisksQuery } from '../../store';
import DiskItem from '../../components/disks/DiskItem';
import Skeleton from '../../layouts/Skeleton';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '@melody-trade/api-interfaces';

const ITEMS_PER_PAGE = 9;

export default function DisksIndexPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useGetAllDisksQuery('');

  useEffect(() => {
    if (!isLoading) {
      enqueueSnackbar('Loading Disks...', { variant: 'info' });
    }
    if (isError) {
      enqueueSnackbar('Error Loading Disks, Please Refresh the Page...', {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, isError, isLoading]);

  const filteredDisks = isSuccess
    ? data?.data?.filter((disk: Item) =>
        disk.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (searchQuery !== '') {
      setPrevPage(currentPage);
      setCurrentPage(1);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (prevPage !== currentPage) {
      setPrevPage(currentPage);
    }
  }, [currentPage, prevPage]);

  const totalPages = Math.ceil(filteredDisks.length / ITEMS_PER_PAGE);
  const indexOfLastDisk = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDisk = indexOfLastDisk - ITEMS_PER_PAGE;
  const currentDisks = filteredDisks.slice(indexOfFirstDisk, indexOfLastDisk);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="mb-3">
          <input
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mx-auto relative m-0 block w-2/4 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-200 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            id="search"
            placeholder="Search..."
          />
        </div>{' '}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading && <Skeleton className="h-72 w-full" times={6} />}
          {isError && <div className="text-red-600">Error Loading Disks!</div>}
          {isSuccess &&
            (currentDisks.length === 0 ? (
              <div className="text-xl m-6 text-white">No disks found.</div>
            ) : (
              currentDisks.map((disk: Item) => (
                <DiskItem key={disk.id} disk={disk} />
              ))
            ))}
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
