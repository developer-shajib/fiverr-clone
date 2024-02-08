'use client';

import { useUpdateOrderMutation } from '@/features/auth/authApiSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import { useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Success({ params, searchParams }) {
  const { payment_intent } = searchParams;
  const router = useRouter();
  const [updateOrder, { error }] = useUpdateOrderMutation();
  const dispatch = useDispatch();

  const orderUpdate = async () => {
    await dispatch(updateOrder({ paymentIntent: payment_intent }));
  };

  useEffect(() => {
    if (payment_intent) {
      orderUpdate();
      setTimeout(() => {
        router.push('/buyer/orders');
      }, 5000);
    } else {
      router.push('/');
    }
    if (error) {
      sweetAlert(error?.data?.message);
      router.push('/');
    }
  }, [payment_intent, router, dispatch]);

  return (
    <>
      {payment_intent ? (
        <div className='h-[80vh] flex items-center px-20 pt-20 flex-col mt-32'>
          <h1 className='text-3xl text-center text-[#1DBF73]'>Payment successful. You are being redirected to the orders page.</h1>
          <h1 className='text-3xl text-center text-[#1DBF73]'>Please do not close the page.</h1>
        </div>
      ) : (
        <div className='mt-32'></div>
      )}
    </>
  );
}

export default Success;
