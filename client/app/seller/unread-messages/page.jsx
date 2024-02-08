'use client';

import { useGetUnreadMessagesQuery, useMarkAsReadMutation } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState } from '@/features/auth/authSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import Link from 'next/link.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UnreadMessages() {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector(getAllAuthState);
  const { data, error } = useGetUnreadMessagesQuery();
  const [markAsRead, { data: markReadData, error: markReadError }] = useMarkAsReadMutation();
  const dispatch = useDispatch();

  const handleMarkAsRead = (id) => {
    if (!user) return sweetAlert('You are not authenticate!');

    const clonedMessages = [...messages];
    const filterMessage = clonedMessages?.filter((item) => item?.id != id);
    setMessages(filterMessage);

    dispatch(markAsRead({ id, data: {} }));
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setMessages(data.unreadMessages);
    }
    if (error) {
      sweetAlert(error.data.message);
    }
  }, [data, error]);

  return (
    <>
      <div className='min-h-[80vh] my-10  px-32 mt-32'>
        <h3 className='m-5 text-2xl font-semibold'>All your Unread Messages</h3>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Text
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Sender Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Order Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Mark as Read
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  View Conversation
                </th>
              </tr>
            </thead>
            <tbody>
              {messages?.length > 0 ? (
                messages.map((message) => {
                  return (
                    <tr
                      className='bg-white dark:bg-gray-800 hover:bg-gray-50'
                      key={message.text}>
                      <th
                        scope='row'
                        className='px-6 py-4 '>
                        {message?.text}
                      </th>
                      <th
                        scope='row'
                        className='px-6 py-4 '>
                        {message?.sender?.fullName}
                      </th>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium'>
                        {message.orderId}
                      </th>
                      <td className='px-6 py-4 '>
                        <Link
                          href='#'
                          onClick={(e) => {
                            e.preventDefault();
                            handleMarkAsRead(message.id);
                          }}
                          className='font-medium text-blue-600  hover:underline'>
                          Mark as Read
                        </Link>
                      </td>
                      <td className='px-6 py-4 '>
                        <Link
                          href={`/seller/orders/messages/${message.orderId}`}
                          className='font-medium text-blue-600  hover:underline'>
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center text-2xl'>No undread</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UnreadMessages;
