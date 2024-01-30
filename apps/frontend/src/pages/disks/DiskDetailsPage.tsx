import { useParams } from 'react-router-dom';
import { useGetDiskDetailsQuery } from '../../store';
import Skeleton from '../../layouts/Skeleton';
import NotFound from '../../layouts/NotFound';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import DiskDetails from '../../components/disks/DiskDetails';

export default function DiskDetailsPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { diskId } = useParams();
  const { data, isFetching, isError } = useGetDiskDetailsQuery(diskId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isFetching) {
      enqueueSnackbar('Getting Disk Data...', {
        variant: 'info',
      });
    }
  }, [isFetching, enqueueSnackbar]);

  if (isFetching) {
    return <Skeleton times={3} className={'h-36 w-full '} />;
  }
  if (!data || isError) {
    return <NotFound />;
  }

  return <DiskDetails disk={data} />;
}
