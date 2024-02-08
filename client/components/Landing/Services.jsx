'use client';

import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { categories } from '../Data/Categories.jsx';

function Services() {
  const router = useRouter();

  return (
    <div className='mx-20 my-16 '>
      <h2 className='text-4xl mb-10 text-[#404145] font-bold '>You need it, we&apos;ve got it</h2>
      <ul className='grid grid-cols-5 gap-10'>
        {categories?.map(({ name, logo }) => {
          return (
            <li
              key={name}
              className='relative flex flex-col justify-center items-center cursor-pointer   border-2 border-transparent p-5 transition-all duration-500 group'
              onClick={() => router.push(`/search?category=${name} `)}>
              <Image
                src={logo}
                alt='category'
                height={50}
                width={50}
              />

              <p className='w-14 h-[2px] bg-slate-400 transition-all my-2 group-hover:bg-emerald-500 group-hover:w-24'></p>

              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Services;
