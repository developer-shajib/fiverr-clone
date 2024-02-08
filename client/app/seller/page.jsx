'use client';

import { useGetSellerDataQuery } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState } from '@/features/auth/authSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Seller() {
  const { user } = useSelector(getAllAuthState);
  const [dashboardData, setDashboardData] = useState(null);
  const { data, error } = useGetSellerDataQuery();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setDashboardData(data.dashboardData);
    }
    if (error) {
      sweetAlert(error.data.message);
    }
  }, [data, error]);

  return (
    <>
      {user && (
        <div className='flex min-h-[80vh] my-10 px-32 gap-5 mt-40'>
          <div className='shadow-md h-max p-10 flex flex-col gap-5 min-w-96 w-96'>
            <div className='flex gap-5 justify-center items-center'>
              <div>
                {user?.imageName ? (
                  <Image
                    src={user.profileImage || user.imageName}
                    alt='Profile'
                    width={140}
                    height={140}
                    className='rounded-full'
                  />
                ) : (
                  <div className='bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative'>
                    <span className='text-5xl text-white'>{user.email[0].toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-[#62646a] text-lg font-medium'>{user.username}</span>
                <span className='font-bold text-md'>{user.fullName}</span>
              </div>
            </div>
            <div className='border-t py-5'>
              <p>{user.description}</p>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-3 gap-10 w-full'>
              <div
                className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'
                onClick={() => router.push('/seller/gigs')}>
                <h2 className='text-xl'>Total Gigs</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>{dashboardData?.gigs}</h3>
              </div>
              <div
                className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'
                onClick={() => router.push('/seller/orders')}>
                <h2 className='text-xl'>Total Orders</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>{dashboardData?.orders}</h3>
              </div>
              <div
                className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'
                onClick={() => router.push('/seller/unread-messages')}>
                <h2 className='text-xl'> Unread Messages</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>{dashboardData?.unreadMessages}</h3>
              </div>

              <div className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'>
                <h2 className='text-xl'>Earnings Today</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>${dashboardData?.dailyRevenue}</h3>
              </div>
              <div className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'>
                <h2 className='text-xl'>Earnings Monthly</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>${dashboardData?.monthlyRevenue}</h3>
              </div>
              <div className='shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'>
                <h2 className='text-xl'>Earnings Yearly</h2>
                <h3 className='text-[#1DBF73] text-3xl font-extrabold'>${dashboardData?.revenue}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Seller;
