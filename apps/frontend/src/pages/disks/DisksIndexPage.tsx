import { useGetAllDisksQuery } from '../../store';
import DiskItem from '../../components/DiskItem';
import Skeleton from '../../components/Skeleton';
import { useSnackbar } from 'notistack';

export default function DisksIndexPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isError } = useGetAllDisksQuery();

  let content;
  if (isLoading) {
    content = <Skeleton className={'h-48 w-full'} times={3} />;
  } else if (isError) {
    enqueueSnackbar('Error Loading Disks, Please Refresh the Page...', {
      variant: 'error',
    });
    content = <div>Error Loading Disks!</div>;
  } else {
    content = data.data.map((disk) => <DiskItem key={disk.id} disk={disk} />);
  }
  return (
    <>
      <h1 className="text-xl m-6">All Disks {`(${data?.count})`}</h1>
      <div>{content}</div>
    </>
  );
}
