import { Swap } from '@melody-trade/api-interfaces';
import { useAcceptSwapMutation } from '../../store';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function useAcceptSwap(swap: Swap) {
  const [acceptSwap, acceptResults] = useAcceptSwapMutation();

  const handleAcceptRequest = () => {
    acceptSwap(swap.id);
  };
  useEffect(() => {
    if (acceptResults.isSuccess) {
      enqueueSnackbar('Swap request accepted successfully', {
        variant: 'success',
      });
    }
    if (acceptResults.isLoading) {
      enqueueSnackbar('Accepting swap request...', { variant: 'info' });
    }
    if (acceptResults.isError) {
      enqueueSnackbar(acceptResults.error?.data.message, { variant: 'error' });
    }
  }, [
    acceptResults.isSuccess,
    acceptResults.isLoading,
    acceptResults.isError,
    acceptResults.error?.data.message,
  ]);
  return { handleAcceptRequest };
}
