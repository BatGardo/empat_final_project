import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import type { LoginInterface, RegisterInterface } from '../auth-schema/types';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    checkSession: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['auth'],
    }),

    login: builder.mutation<AuthResponse, LoginInterface>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    register: builder.mutation<AuthResponse, RegisterInterface>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
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
