import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// <!-- Create Api Slice -->
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // 'http://localhost:5050',

    credentials: 'include',
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      // Add custom headers here
      const token = getState()?.userState?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

export default apiSlice;
