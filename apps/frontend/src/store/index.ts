import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersApi } from './apis/usersApi';
import { disksApi } from './apis/disksApi';
import { swapsApi } from './apis/swapsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [disksApi.reducerPath]: disksApi.reducer,
    [swapsApi.reducerPath]: swapsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(disksApi.middleware)
      .concat(swapsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useAddUserMutation,
  useGetCurUserQuery,
  useGetUserDetailsQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} from './apis/usersApi';

export {
  useCreateDiskMutation,
  useDeleteDiskMutation,
  useEditDiskMutation,
  useGetAllDisksQuery,
  useGetDiskDetailsQuery,
  useGetDisksByUsernameQuery,
} from './apis/disksApi';

export {
  useAcceptSwapMutation,
  useCancelSwapMutation,
  useCreateSwapMutation,
  useGetPendingSwapsQuery,
  useGetSwapDetailsQuery,
  useRejectSwapMutation,
} from './apis/swapsApi';
