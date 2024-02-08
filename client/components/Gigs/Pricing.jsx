'use client';

import { getAllAuthState } from '@/features/auth/authSlice.jsx';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { FiClock, FiRefreshCcw } from 'react-icons/fi';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation.js';
import { useCreateOrderMutation } from '@/features/auth/authApiSlice.jsx';
import { useEffect } from 'react';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import { useState } from 'react';

function Pricing({ gigData }) {
  const { user } = useSelector(getAllAuthState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [createOrder, { data, isSuccess, error, isLoading }] = useCreateOrderMutation();
  const [clientSecret, setClientSecret] = useState('');

  // Continue button handler for checkout
  const handleContinueButton = (id) => {
    dispatch(createOrder({ gigId: id }));
  };

  useEffect(() => {
    if (clientSecret) {
      router.push(`/checkout?gigId=${gigData.id}&clientSecret=${clientSecret}`);
    }
    if (isSuccess) {
      setClientSecret(data.clientSecret);
    }

    if (error) {
      sweetAlert(error?.data?.message);
    }
  }, [isSuccess, data, error, clientSecret]);

  return (
    <>
      {gigData && (
        <div className='sticky top-36 mb-10 h-max w-96'>
          <div className='border p-10 flex flex-col gap-5'>
            <div className='flex justify-between'>
              <h4 className='text-md font-normal text-[#74767e]'>{gigData?.shortDesc}</h4>
              <h6 className='font-medium text-lg'>${gigData?.price}</h6>
            </div>
            <div>
              <div className='text-[#62646a] font-semibold text-sm flex gap-6'>
                <div className='flex items-center gap-2'>
                  <FiClock className='text-xl' />
                  <span>{gigData?.deliveryTime} Days Delivery</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FiRefreshCcw className='text-xl' />
                  <span>{gigData?.revisions} Revisions</span>
                </div>
              </div>
              <ul></ul>
            </div>
            <ul className='flex gap-1 flex-col'>
              {gigData?.features?.map((feature) => (
                <li
                  key={feature}
                  className='flex items-center gap-3'>
                  <BsCheckLg className='text-[#1DBF73] text-lg' />
                  <span className='text-[#4f5156]'>{feature}</span>
                </li>
              ))}
            </ul>
            {gigData?.userId === user?.id ? (
              <button
                className='flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded'
                onClick={() => router.push(`/seller/gigs/${gigData?.id}`)}>
                <span>Edit</span>
                <BiRightArrowAlt className='text-2xl absolute right-4' />
              </button>
            ) : (
              <button
                onClick={() => handleContinueButton(gigData?.id)}
                className='flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded'
                // onClick={() => router.push(`/checkout?gigId=${gigData?.id}`)}
              >
                <span>{isLoading ? 'Loading...' : 'Continue'}</span>
                <BiRightArrowAlt className='text-2xl absolute right-4' />
              </button>
            )}
          </div>
          {gigData?.userId !== user?.id && (
            <div className='flex items-center justify-center mt-5'>
              <button className=' w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold'>Contact Me</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Pricing;
