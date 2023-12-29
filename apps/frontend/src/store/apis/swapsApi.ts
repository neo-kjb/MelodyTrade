import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/getAuthToken';

const swapsApi = createApi({
  reducerPath: 'swaps',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/swaps',
  }),

  endpoints(builder) {
    return {
      createSwap: builder.mutation({
        query: ({ sentItemId, receivedItemId }) => {
          return {
            url: '/',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
            body: {
              sentItemId,
              receivedItemId,
            },
          };
        },
      }),
      getPendingSwaps: builder.query({
        query: () => {
          return {
            url: '/',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
      getSwapDetails: builder.query({
        query: (swapId) => {
          return {
            url: `/${swapId}`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
      acceptSwap: builder.mutation({
        query: (swapId) => {
          return {
            url: `/${swapId}/accept`,
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
      rejectSwap: builder.mutation({
        query: (swapId) => {
          return {
            url: `/${swapId}/reject`,
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
      cancelSwap: builder.mutation({
        query: (swapId) => {
          return {
            url: `/${swapId}/cancel`,
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
    };
  },
});

export { swapsApi };
export const {
  useAcceptSwapMutation,
  useCancelSwapMutation,
  useCreateSwapMutation,
  useGetPendingSwapsQuery,
  useGetSwapDetailsQuery,
  useRejectSwapMutation,
} = swapsApi;
