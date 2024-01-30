import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiskDetailsQuery } from '../../store';
import { enqueueSnackbar } from 'notistack';
import NotFound from '../../layouts/NotFound';
import EditDiskForm from '../../components/disks/EditDiskForm';

export default function EditDiskPage() {
  const { diskId } = useParams();
  const { data, isLoading, isSuccess, isError } =
    useGetDiskDetailsQuery(diskId);

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar('Getting disk details...', { variant: 'info' });
    }
  }, [isLoading]);

  if (isError) {
    return <NotFound />;
  }

  if (isSuccess) {
    return <EditDiskForm disk={data} />;
  }
}
