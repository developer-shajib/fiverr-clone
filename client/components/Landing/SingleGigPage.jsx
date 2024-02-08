'use client';

import { useCheckGigOrderQuery, useGetSingleGigQuery } from '@/features/auth/authApiSlice.jsx';
import Details from '../Gigs/Details.jsx';
import Pricing from '../Gigs/Pricing.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthState, setUserInfo } from '@/features/auth/authSlice.jsx';

function SingleGigPage({ gigId }) {
  const { isSuccess, data } = useGetSingleGigQuery(gigId);
  const { data: checkGigOrderData, isSuccess: checkGigOrderIsSuccess } = useCheckGigOrderQuery(gigId);
  const dispatch = useDispatch();
  const { gigData } = useSelector(getAllAuthState);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ gigData: data.gig }));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (checkGigOrderIsSuccess) {
      dispatch(setUserInfo({ hasOrdered: checkGigOrderData.hasUserOrderedGig }));
    }
  }, [checkGigOrderIsSuccess, dispatch, checkGigOrderData]);

  return (
    <>
      <div className='grid grid-cols-3 mx-32 gap-20 mt-32 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
        <Details gigData={gigData} />
        <Pricing gigData={gigData} />
      </div>
    </>
  );
}

export default SingleGigPage;
