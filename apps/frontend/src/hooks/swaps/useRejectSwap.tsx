import { enqueueSnackbar } from 'notistack';
import { useRejectSwapMutation } from '../../store';
import { Swap } from '@melody-trade/api-interfaces';
import { useEffect } from 'react';

export default function useRejectSwap(swap: Swap) {
  const [rejectSwap, rejectResults] = useRejectSwapMutation();

  const handleRejectRequest = () => {
    rejectSwap(swap.id);
  };
  useEffect(() => {
    if (rejectResults.isSuccess) {
      enqueueSnackbar('Swap request rejected successfully', {
        variant: 'success',
      });
    }
    if (rejectResults.isLoading) {
      enqueueSnackbar('Rejecting swap request...', { variant: 'info' });
    }
    if (rejectResults.isError) {
      enqueueSnackbar(rejectResults.error?.data.message, { variant: 'error' });
    }
  }, [
    rejectResults.isSuccess,
    rejectResults.isLoading,
    rejectResults.isError,
    rejectResults.error?.data.message,
  ]);
  return { handleRejectRequest };
}
