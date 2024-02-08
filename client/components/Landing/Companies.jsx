import Image from 'next/image.js';

function Companies() {
  return (
    <div className='flex items-center justify-center text-gray-400 text-xl font-bold min-h-[11vh] py-3 bg-gray-100'>
      Trusted by: &nbsp;
      <ul className='flex justify-between gap-10 ml-10'>
        {[1, 2, 3, 4, 5].map((num) => (
          <li
            key={num}
            className='relative h-[4.5rem] w-[4.5rem]'>
            <Image
              src={`/trusted${num}.png`}
              alt='trusted brands'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
