'use client';

import { getAllAuthState } from '@/features/auth/authSlice.jsx';
import Link from 'next/link.js';
import { useSelector } from 'react-redux';
import { TiEdit } from 'react-icons/ti';

function GigsPage() {
  const { user } = useSelector(getAllAuthState);

  return (
    <>
      <div className='mt-32 min-h-[80vh] my-10  px-32'>
        <h3 className='m-5 text-2xl font-semibold'>All your Gigs</h3>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user?.gigs?.map((item, index) => (
                <tr
                  key={index}
                  className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {item?.title}
                  </th>
                  <td className='px-6 py-4'>{item?.category}</td>
                  <td className='px-6 py-4'>${item?.price}</td>
                  <td className='px-6 py-4'>{item?.deliveryTime}</td>
                  <td className='px-6 py-4'>
                    <Link
                      href={`/seller/gigs/${item.id}`}
                      className='font-medium text-xl text-red-600 dark:text-blue-500 hover:underline'>
                      <TiEdit />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GigsPage;
