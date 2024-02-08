'use client';

import { useCreateOrderMutation } from '@/features/auth/authApiSlice.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx';
import { loadStripe } from '@stripe/stripe-js';

function CheckoutPage({ gigId, getClientSecret }) {
  const [createOrder, { data, isSuccess, error, isLoading }] = useCreateOrderMutation();
  const [clientSecret, setClientSecret] = useState('');
  const dispatch = useDispatch();

  // Stripe payment
  const stripePromise = loadStripe('pk_test_51OMVjoBdEm986tXbK5RlY22kRdxaxQLVywCMrR84T2OjCHgLdbenBNZdDWup4mKvmNKQgf1m8Hr8SpPDhlBOasqm00DkIDnfZc');
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret,
    appearance
  };

  useEffect(() => {
    if (getClientSecret) {
      setClientSecret(getClientSecret);
    }
  }, [getClientSecret]);

  return (
    <>
      <div className='min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center mt-32'>
        <h1 className='text-3xl'>Please complete the payment to place the order.</h1>
        {clientSecret && (
          <Elements
            options={options}
            stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
