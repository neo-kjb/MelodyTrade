import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/getAuthToken';

const disksApi = createApi({
  reducerPath: 'disks',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/disks',
  }),
  endpoints(builder) {
    return {
      getAllDisks: builder.query({
        query: () => {
          return {
            url: '/',
            method: 'GET',
          };
        },
      }),
      createDisk: builder.mutation({
        query: (disk) => {
          const { name, description, location, imageURL } = disk;
          return {
            url: '/add',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
            body: {
              name,
              description,
              location,
              imageURL,
            },
          };
        },
      }),
      getDiskDetails: builder.query({
        query: (diskId) => {
          return {
            url: `/${diskId}`,
            method: 'GET',
          };
        },
      }),
      getDisksByUsername: builder.query({
        query: (username) => {
          return {
            url: `/user/${username}`,
            method: 'GET',
          };
        },
      }),
      editDisk: builder.mutation({
        query: (disk) => {
          const { name, description, location, imageURL } = disk;
          return {
            url: `/${disk.id}/edit`,
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
            body: { name, description, location, imageURL },
          };
        },
      }),
      deleteDisk: builder.mutation({
        query: (diskId) => {
          return {
            url: `/${diskId}`,
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
    };
  },
});

export { disksApi };
export const {
  useGetAllDisksQuery,
  useCreateDiskMutation,
  useDeleteDiskMutation,
  useEditDiskMutation,
  useGetDiskDetailsQuery,
  useGetDisksByUsernameQuery,
} = disksApi;
