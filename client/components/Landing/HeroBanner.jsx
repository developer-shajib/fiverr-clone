'use client';

import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import bg1 from '@/public/bg-hero1.webp';
import bg2 from '@/public/bg-hero2.webp';
import bg3 from '@/public/bg-hero3.webp';
import bg4 from '@/public/bg-hero4.webp';
import bg5 from '@/public/bg-hero5.webp';
import bg6 from '@/public/bg-hero6.webp';

// <!-- Banner Image -->
const images = [
  {
    url: bg1
  },
  {
    url: bg2
  },
  {
    url: bg3
  },
  {
    url: bg4
  },
  {
    url: bg5
  },
  {
    url: bg6
  }
];

function HeroBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(image >= 6 ? 1 : image + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [image]);

  return (
    <>
      <div className='h-[680px] relative bg-cover'>
        <div className='absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0'>
          {images?.map((item, index) => (
            <Image
              key={index}
              alt='hero'
              src={item?.url}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className={`${image === index + 1 ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`}
            />
          ))}
        </div>
        <div className='z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20'>
          <h1 className='text-white text-5xl leading-snug'>
            Find the perfect&nbsp;
            <i>freelance</i>
            <br />
            services for your business
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${searchData}`);
            }}
            className='flex align-middle'>
            <div className='relative'>
              <IoSearchOutline className='absolute text-gray-500 text-2xl flex align-middle h-full left-2' />
              <input
                type='text'
                className='h-14 w-[450px] pl-10 rounded-md rounded-r-none'
                placeholder={`Try "building mobile app"`}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md'>
              Search
            </button>
          </form>
          <div className='text-white flex gap-4'>
            Popular:
            <ul className='flex gap-5'>
              <li
                className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer'
                onClick={() => router.push('/search?q=website design')}>
                Website Design
              </li>
              <li
                className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer'
                onClick={() => router.push('/search?q=wordpress')}>
                Wordpress
              </li>
              <li
                className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer'
                onClick={() => router.push('/search?q=logo design')}>
                Logo Design
              </li>
              <li
                className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer'
                onClick={() => router.push('/search?q=ai services')}>
                AI Services
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
