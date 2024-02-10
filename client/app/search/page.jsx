'use client';

import SearchGridItem from '@/components/SearchGridItem/SearchGridItem.jsx';
import { useSearchGigQuery } from '@/features/auth/authApiSlice.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function Search({ params, searchParams }) {
  const { category, q } = searchParams;
  const [gigs, setGigs] = useState([]);
  const { error, isSuccess, isLoading, data } = useSearchGigQuery({ searchTerm: q, category });

  useEffect(() => {
    if (data) {
      setGigs(data.gigs);
    }
  }, [data, setGigs]);

  return (
    <>
      {gigs && (
        <div className='mx-24 mt-32 mb-24'>
          {q && (
            <h3 className='text-4xl mb-10'>
              Results for <strong>{q}</strong>
            </h3>
          )}
          <div className='flex gap-4'>
            <button className='py-2 px-5 border border-gray-400 rounded-lg font-medium flex items-center justify-center gap-1'>
              Category <IoIosArrowDown />
            </button>
            <button className='py-2 px-5 border border-gray-400 rounded-lg font-medium flex items-center justify-center gap-1'>
              Budget <IoIosArrowDown />
            </button>
            <button className='py-2 px-5 border border-gray-400 rounded-lg font-medium flex items-center justify-center gap-1'>
              Delivery Time <IoIosArrowDown />
            </button>
          </div>
          <div>
            <div className='my-4'>
              <span className='text-[#74767e] font-medium '>{gigs.length} services available</span>
            </div>
            <div className='flex flex-wrap gap-2 '>
              {gigs?.map((gig) => (
                <SearchGridItem
                  gig={gig}
                  key={gig?.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
