import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice.jsx';
import authReducer from '@/features/auth/authSlice.jsx';

// Create store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userState: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NEXT_PUBLIC_APP_ENVIRONMENT == 'Development' ? true : false
});

//export
export default store;
