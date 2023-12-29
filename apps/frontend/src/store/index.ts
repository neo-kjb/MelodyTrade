import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersApi } from './apis/usersApi';
import { disksApi } from './apis/disksApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [disksApi.reducerPath]: disksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(disksApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useAddUserMutation,
  useGetCurUserQuery,
  useGetUserDetailsQuery,
  useLoginUserMutation,
} from './apis/usersApi';

export {
  useCreateDiskMutation,
  useDeleteDiskMutation,
  useEditDiskMutation,
  useGetAllDisksQuery,
  useGetDiskDetailsQuery,
} from './apis/disksApi';
