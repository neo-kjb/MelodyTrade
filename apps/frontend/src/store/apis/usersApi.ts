import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/getAuthToken';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/auth',
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation({
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
        query: () => {
          return {
            url: '/auth',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + getAuthToken(),
            },
          };
        },
      }),
      getUserDetails: builder.query({
        query: (username) => {
          return {
            url: `/${username}`,
            method: 'GET',
          };
        },
      }),
      logoutUser: builder.mutation({
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
