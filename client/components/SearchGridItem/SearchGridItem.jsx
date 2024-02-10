'use client';

import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { FaStar } from 'react-icons/fa6';

function SearchGridItem({ gig, key }) {
  const router = useRouter();

  const calculateRatings = () => {
    const { reviews } = gig;
    let rating = 0;
    if (!reviews?.length) {
      return 0;
    }
    reviews?.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };
  return (
    <>
      <div
        className='w-1/4 flex flex-col gap-2 p-1 cursor-pointer mb-8'
        onClick={() => router.push(`/gig/${gig?.id}`)}>
        <div className='relative w-80 h-52'>
          <Image
            src={gig?.images[0]}
            alt='gig'
            fill
            className='rounded-xl'
          />
        </div>
        <div className='flex items-center gap-2'>
          <div>
            {gig?.createdBy?.profileImage ? (
              <Image
                src={gig?.createdBy?.profileImage}
                alt='profile'
                height={30}
                width={30}
                className='rounded-full'
              />
            ) : (
              <div className='bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative'>
                <span className='text-lg text-white'>{gig?.createdBy?.email[0].toUpperCase()}</span>
              </div>
            )}
          </div>
          <span className='text-md '>
            <strong className='font-medium'>{gig?.createdBy?.username}</strong>
          </span>
        </div>
        <div>
          <p className='line-clamp-2 text-[#404145]'>{gig?.title}</p>
        </div>
        <div className='flex items-center gap-1 text-yellow-400'>
          <FaStar />
          <span>
            <strong className='font-medium'>{calculateRatings()}</strong>
          </span>
          <span className='text-[#74767e]'>({gig?.reviews?.length})</span>
        </div>
        <div>
          <strong className='font-medium'>From ${gig?.price}</strong>
        </div>
      </div>
    </>
  );
}

export default SearchGridItem;
