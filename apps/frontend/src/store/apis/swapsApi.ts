import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/getAuthToken';

const swapsApi = createApi({
  reducerPath: 'swaps',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/swaps',
  }),
  tagTypes: ['Swap'],
  endpoints(builder) {
    return {
      createSwap: builder.mutation({
        invalidatesTags: ['Swap'],
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
        providesTags: ['Swap'],
        query: (token) => {
          return {
            url: '/',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          };
        },
      }),
      getSwapDetails: builder.query({
        providesTags: ['Swap'],
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
        invalidatesTags: ['Swap'],
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
        invalidatesTags: ['Swap'],
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
        invalidatesTags: ['Swap'],
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
      getSwapHistory: builder.query({
        providesTags: ['Swap'],
        query: () => {
          return {
            url: '/accepted',
            method: 'GET',
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
  useGetSwapHistoryQuery,
} = swapsApi;
