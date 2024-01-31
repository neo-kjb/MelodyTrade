import { useEffect, useState } from 'react';
import { useGetAllDisksQuery } from '../../store';
import { enqueueSnackbar } from 'notistack';
import { Item } from '@melody-trade/api-interfaces';
import Skeleton from '../../layouts/Skeleton';
import DiskItem from '../../components/disks/DiskItem';

const ITEMS_PER_PAGE = 9;

export default function useGetFilteredDisks() {
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
  }, [isError, isLoading]);

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

  let content;
  if (isLoading) {
    content = <Skeleton className="h-72 w-full" times={6} />;
  }
  if (isError) {
    content = <div className="text-red-600">Error Loading Disks!</div>;
  }
  if (isSuccess) {
    content =
      currentDisks.length === 0 ? (
        <div className="text-xl m-6 text-white">No disks found.</div>
      ) : (
        currentDisks.map((disk: Item) => <DiskItem key={disk.id} disk={disk} />)
      );
  }
  return {
    handlePageChange,
    totalPages,
    setSearchQuery,
    data,
    currentPage,
    content,
  };
}
