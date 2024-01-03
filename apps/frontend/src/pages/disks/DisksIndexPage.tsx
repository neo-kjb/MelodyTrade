import { useGetAllDisksQuery } from '../../store';
import DiskItem from '../../components/DiskItem';
import Skeleton from '../../components/Skeleton';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DisksIndexPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isError } = useGetAllDisksQuery();

  useEffect(() => {
    if (!isLoading) {
      enqueueSnackbar('Loading Disks...', { variant: 'info' });
    }
  }, [enqueueSnackbar, isLoading]);

  let content;
  if (isLoading) {
    content = <Skeleton className={'h-48 w-full'} times={3} />;
  } else if (isError) {
    enqueueSnackbar('Error Loading Disks, Please Refresh the Page...', {
      variant: 'error',
    });
    content = <div>Error Loading Disks!</div>;
  } else if (data.message) {
    return (
      <div className="text-xl m-6">
        The List is Empty at the Moment,{' '}
        <Link to={'/users/login'} className="text-blue-700">
          Log in
        </Link>{' '}
        and start adding disks{' '}
        <Link to={'/disks/new'} className="text-blue-700">
          now
        </Link>
      </div>
    );
  } else {
    content = data.data?.map((disk) => <DiskItem key={disk.id} disk={disk} />);
  }
  return (
    <>
      <h1 className="text-xl m-6">All Disks {`(${data?.count})`}</h1>
      <div>{content}</div>
    </>
  );
}
