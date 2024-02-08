import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// <!-- Create Api Slice -->
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // 'http://localhost:5050',

    credentials: 'include',
    withCredentials: true
  }),
  endpoints: () => ({})
});

export default apiSlice;
