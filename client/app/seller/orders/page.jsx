'use client';

import { useGetSellerOrdersQuery } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState, setUserInfo } from '@/features/auth/authSlice.jsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link.js';
import { IoMdSend } from 'react-icons/io';

function Orders() {
  const { user, orders } = useSelector(getAllAuthState);
  const { data, isError, isSuccess, isLoading, error } = useGetSellerOrdersQuery(user, { enabled: !user });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ orders: data.orders }));
    }
    if (error) {
      console.log(error.message);
    }
  }, [isSuccess, data, error, dispatch]);

  return (
    <>
      <div className='mt-32 min-h-[80vh] my-10  px-24'>
        <h3 className='m-5 text-2xl font-semibold'>All your Order</h3>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Order Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Category
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Price
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Delivery Time
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Order Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Send Message
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders?.map((item, index) => (
                  <tr
                    key={item.id}
                    className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {index + 1}
                    </th>
                    <td className='px-6 py-4'>{item?.gig?.title}</td>
                    <td className='px-6 py-4'>{item?.gig?.category}</td>
                    <td className='px-6 py-4'>${item?.gig?.price}</td>
                    <td className='px-6 py-4'>{item?.gig?.deliveryTime}</td>
                    <td className='px-6 py-4'>{item?.createdAt.split('T')[0]}</td>
                    <td className='px-6 py-4 '>
                      <Link
                        href={`/seller/orders/messages/${item.id}`}
                        className='font-medium text-xl text-green-900 dark:text-blue-500 hover:underline flex justify-center'>
                        <IoMdSend />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <p className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center text-2xl'>No order running</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;
