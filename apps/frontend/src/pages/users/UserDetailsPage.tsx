import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCurUserQuery, useGetUserDetailsQuery } from '../../store';
import UserProfile from '../../components/UserProfile';
import UserDisks from '../../components/UserDisks';
import SwapHistory from '../../components/SwapHistory';
import { enqueueSnackbar } from 'notistack';
import NotFound from '../../components/NotFound';
import Skeleton from '../../components/Skeleton';

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { data, isLoading, isError, isSuccess, error } =
    useGetUserDetailsQuery(userId);

  const { data: CurrentUserData } = useGetCurUserQuery();

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
      <>
        <UserProfile user={data} />
        <UserDisks user={data} />
        {isPageOwner && <SwapHistory user={data} />}
      </>
    )
  );
}
