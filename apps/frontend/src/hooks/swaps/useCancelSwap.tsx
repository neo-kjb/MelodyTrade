import { useEffect } from 'react';
import { useCancelSwapMutation } from '../../store';
import { Swap } from '@melody-trade/api-interfaces';
import { enqueueSnackbar } from 'notistack';

export default function useCancelSwap(swap: Swap) {
  const [cancelSwap, cancelResults] = useCancelSwapMutation();
  const handleCancelRequest = () => {
    cancelSwap(swap.id);
  };
  useEffect(() => {
    if (cancelResults.isSuccess) {
      enqueueSnackbar('Swap request canceled successfully', {
        variant: 'success',
      });
    }
    if (cancelResults.isLoading) {
      enqueueSnackbar('Canceling swap request...', { variant: 'info' });
    }
    if (cancelResults.isError) {
      enqueueSnackbar(cancelResults.error?.data.message, { variant: 'error' });
    }
  }, [
    cancelResults.isSuccess,
    cancelResults.isLoading,
    cancelResults.isError,
    cancelResults.error?.data.message,
  ]);
  return { handleCancelRequest };
}
