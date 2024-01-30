import { useNavigate } from 'react-router-dom';
import { useDeleteDiskMutation } from '../../store';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Item } from '@melody-trade/api-interfaces';

export default function useDeleteDisk(disk: Item) {
  const navigate = useNavigate();
  const [deleteDisk, deleteDiskResults] = useDeleteDiskMutation();

  const handleDeleteDisk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmDeleteDisk = window.confirm(
      'Are you sure you want to delete the disk and its associated swap history?'
    );
    if (confirmDeleteDisk) {
      deleteDisk(disk.id);
      navigate(`/users/${disk.userId}`);
    } else {
      return;
    }
  };
  useEffect(() => {
    if (deleteDiskResults.isError && 'data' in deleteDiskResults.error) {
      const deleteErrorData = deleteDiskResults.error as {
        data: { message: string };
      };
      enqueueSnackbar(deleteErrorData.data.message, {
        variant: 'error',
      });
    }

    if (deleteDiskResults.isSuccess) {
      enqueueSnackbar('Disk Deleted Successfully', { variant: 'success' });
    }
    if (deleteDiskResults.isLoading) {
      enqueueSnackbar('Deleting your disk...', { variant: 'info' });
    }
  }, [
    deleteDiskResults.error?.data?.message,
    deleteDiskResults.isError,
    deleteDiskResults.isLoading,
    deleteDiskResults.isSuccess,
    deleteDiskResults.error,
  ]);

  return {
    deleteDiskResults,
    handleDeleteDisk,
  };
}
