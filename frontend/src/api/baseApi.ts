import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Accept', 'application/json');
    return headers;
  },
});
