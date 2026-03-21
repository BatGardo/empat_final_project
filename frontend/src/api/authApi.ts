import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginInterface, RegisterInterface } from '../auth-schema/types';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    checkSession: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['auth'],
    }),

    login: builder.mutation<User, LoginInterface>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['auth'],
    }),

    register: builder.mutation<
      User,
      Omit<RegisterInterface, 'confirm_password'>
    >({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});
export const {
  useCheckSessionQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
