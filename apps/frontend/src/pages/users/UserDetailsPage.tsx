import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCurUserQuery, useGetUserDetailsQuery } from '../../store';
import UserProfile from '../../components/users/UserProfile';
import UserDisks from '../../components/disks/UserDisks';
import SwapHistory from '../../components/swaps/SwapHistory';
import { enqueueSnackbar } from 'notistack';
import NotFound from '../../layouts/NotFound';
import Skeleton from '../../layouts/Skeleton';
import { getAuthToken } from '../../utils/getAuthToken';

export default function UserDetailsPage() {
  const token = getAuthToken();
  const { userId } = useParams();
  const { data, isLoading, isError, isSuccess, error } =
    useGetUserDetailsQuery(userId);

  const { data: CurrentUserData } = useGetCurUserQuery(token);

  const isPageOwner = CurrentUserData?.currUserId === data?.id;

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar('Loading user data...', { variant: 'info' });
    }
    if (isError) {
      enqueueSnackbar(error?.data?.message, { variant: 'error' });
    }
    if (isSuccess) {
      enqueueSnackbar('User data is ready', { variant: 'success' });
    }
  }, [error?.data?.message, isError, isLoading, isSuccess]);
  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return <Skeleton times={5} className={'h-40 w-full'} />;
  }
  return (
    isSuccess && (
      <div className="relative min-h-screen bg-[url(https://cdn.wallpapersafari.com/50/13/jF6QLc.jpg)] bg-cover bg-center p-0 m-0 flex flex-col">
        <UserProfile user={data} />
        <UserDisks user={data} />
        {isPageOwner && <SwapHistory />}
      </div>
    )
  );
}
