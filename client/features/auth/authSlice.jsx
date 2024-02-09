import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// <!-- initial State -->
const initialState = {
  user: '',
  users: [],
  orders: [],
  gigData: {},
  hasOrdered: false,
  successMessage: '',
  error: '',
  showSignInModal: false,
  showSignUpModal: false,
  isSeller: true,
  token: Cookies.get('accessToken') || null
};

// <!-- Auth Slice -->
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action?.payload?.user || state.user;
      state.users = action?.payload?.users || state.users;
      state.orders = action?.payload?.orders || state.orders;
      state.hasOrdered = action?.payload?.hasOrdered || state.hasOrdered;
      state.gigData = action?.payload?.gigData || state.gigData;
    },
    setAddReview: (state, action) => {
      state.gigData.reviews.push(action.payload);
    },

    setMessageEmpty: (state) => {
      state.successMessage = '';
      state.error = '';
    },
    setAuthModal: (state, action) => {
      state.showSignInModal = action?.payload?.singIn;
      state.showSignUpModal = action?.payload?.signUp;
    },
    setLogoutEmpty: (state, action) => {
      state.user = '';
      state.users = '';
      state.orders = [];
      state.hasOrdered = false;
      state.successMessage = '';
      state.error = '';
      state.showSignInModal = false;
      state.showSignUpModal = false;
      state.isSeller = true;
    },
    sellerModeChange: (state) => {
      state.isSeller = !state.isSeller;
    }
  }
});

// <!-- export Selector -->
export const getAllAuthState = (state) => state.userState;

// <!-- export actions -->
export const { setMessageEmpty, setAuthModal, setUserInfo, setLogoutEmpty, sellerModeChange, setAddReview } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
