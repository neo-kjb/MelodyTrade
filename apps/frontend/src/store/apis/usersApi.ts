import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/getAuthToken';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/auth',
  }),
  tagTypes: ['User'],
  endpoints(builder) {
    return {
      addUser: builder.mutation({
        invalidatesTags: ['User'],
        query: (user) => {
          const { username, email, password } = user;
          return {
            url: '/signup',
            method: 'POST',
            body: {
              username,
              email,
              password,
            },
          };
        },
      }),
      loginUser: builder.mutation({
        invalidatesTags: ['User'],
        query: (user) => {
          const { email, password } = user;
          return {
            url: '/login',
            method: 'POST',
            body: {
              email,
              password,
            },
          };
        },
      }),
      getCurUser: builder.query({
        providesTags: ['User'],
        query: (token) => {
          return {
            url: '/auth',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          };
        },
      }),
      getUserDetails: builder.query({
        providesTags: ['User'],
        query: (userId) => {
          return {
            url: `/${userId}`,
            method: 'GET',
          };
        },
      }),
      logoutUser: builder.mutation({
        invalidatesTags: ['User'],
        query: () => {
          return {
            url: '/logout',
            method: 'POST',
          };
        },
      }),
    };
  },
});

export { usersApi };
export const {
  useAddUserMutation,
  useGetCurUserQuery,
  useGetUserDetailsQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} = usersApi;
