import apiSlice from '../apiSlice.jsx';

// <!-- Create Inject endpoint api -->
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: data
      })
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/signIn',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/v1/auth/logout`,
        method: 'POST',
        body: {}
      })
    }),
    me: builder.query({
      query: () => `/api/v1/auth/loggedIn`,
      providesTags: ['Me']
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/v1/user/userUpdate/${data.id}`,
        method: 'PATCH',
        body: data.data
      }),
      invalidatesTags: ['Me']
    }),
    createGig: builder.mutation({
      query: (data) => ({
        url: `/api/v1/gigs`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Me']
    }),
    getSingleGig: builder.query({
      query: (id) => `/api/v1/gigs/${id}`
    }),
    updateGig: builder.mutation({
      query: (data) => ({
        url: `/api/v1/gigs/${data.id}`,
        method: 'PATCH',
        body: data.data
      }),
      invalidatesTags: ['Me']
    }),
    searchGig: builder.query({
      query: (data) => `/api/v1/gigs/search-gig?searchTerm=${data?.searchTerm}&category=${data?.category}`
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/orders`,
        method: 'POST',
        body: data
      })
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/orders`,
        method: 'PATCH',
        body: data
      })
    }),
    getOrders: builder.query({
      query: (data) => `/api/v1/orders/get-buyer-orders`
    }),
    getSellerOrders: builder.query({
      query: (data) => `/api/v1/orders/get-seller-orders`
    }),
    checkGigOrder: builder.query({
      query: (id) => `/api/v1/gigs/check-gig-order/${id}`
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/api/v1/gigs/add-review/${data.id}`,
        method: 'POST',
        body: data.data
      })
    }),
    getMessages: builder.query({
      query: (id) => `/api/v1/messages/${id}`
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: `/api/v1/messages/${data.id}`,
        method: 'POST',
        body: data.data
      })
    }),
    getSellerData: builder.query({
      query: () => `/api/v1/dashboard/seller`
    }),
    getUnreadMessages: builder.query({
      query: () => `/api/v1/messages/unread-messages`
    }),
    markAsRead: builder.mutation({
      query: (data) => ({
        url: `/api/v1/messages/mark-as-read/${data.id}`,
        method: 'PATCH',
        body: data.data
      })
    })
  })
});

// <!-- export endpoints -->
export const {
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateUserMutation,
  useCreateGigMutation,
  useGetSingleGigQuery,
  useUpdateGigMutation,
  useSearchGigQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetOrdersQuery,
  useGetSellerOrdersQuery,
  useCheckGigOrderQuery,
  useAddReviewMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useGetSellerDataQuery,
  useGetUnreadMessagesQuery,
  useMarkAsReadMutation
} = authApiSlice;
