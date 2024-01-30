import { useEffect } from 'react';
import { useCreateSwapMutation } from '../../store';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Item } from '@melody-trade/api-interfaces';

export default function useCreateSwap(disk: Item) {
  const navigate = useNavigate();

  const [createSwap, results] = useCreateSwapMutation();

  const handleSelectDiskToSwap = (senderDisk: Item) => {
    const swapData = {
      sentItemId: senderDisk.id,
      receivedItemId: disk.id,
    };
    createSwap(swapData);
  };
  useEffect(() => {
    if (results.isSuccess) {
      enqueueSnackbar('Swap request sent successfully', {
        variant: 'success',
      });
      navigate('/swaps');
    }

    if (results.error && 'data' in results.error) {
      const errorData = results.error as { data: { message: string } };

      enqueueSnackbar(errorData.data.message, {
        variant: 'error',
      });
    }
  }, [
    results.error,
    results.error?.data?.message,
    results.isSuccess,
    navigate,
  ]);
  return { handleSelectDiskToSwap };
}
