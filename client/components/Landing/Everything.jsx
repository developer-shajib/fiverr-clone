import Image from 'next/image.js';
import { BsCheckCircle } from 'react-icons/bs';
import { FaCirclePlay } from 'react-icons/fa6';

const everythingData = [
  {
    title: 'Stick to your budget',
    subtitle: 'Find the right service for every price point. No hourly rates, just project-based pricing.'
  },
  {
    title: 'Get quality work done quickly',
    subtitle: 'Hand your project over to a talented freelancer in minutes, get long-lasting results.'
  },
  {
    title: "Pay when you're happy",
    subtitle: 'Upfront quotes mean no surprises. Payments only get released when you approve.'
  },
  {
    title: 'Count on 24/7 support',
    subtitle: 'Our round-the-clock support team is available to help anytime, anywhere.'
  }
];

function Everything() {
  return (
    <div className='bg-[#f1fdf7] flex gap-20 py-20 justify-between px-16'>
      <div>
        <h2 className='text-4xl mb-5 text-[#404145] font-bold'>The best part? Everything.</h2>
        <ul className='flex flex-col gap-5'>
          {everythingData.map(({ title, subtitle }, index) => {
            return (
              <li key={index}>
                <div className='flex gap-2 items-center text-xl'>
                  <BsCheckCircle className='text-[#62646a]' />
                  <h4 className='font-semibold'>{title}</h4>
                </div>
                <p className='text-[#62646a]'>{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='relative h-96 w-2/4 flex justify-center items-center'>
        <Image
          src='/everything.webp'
          fill
          alt='everything'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <FaCirclePlay className='absolute h-20 w-20 text-slate-300' />
      </div>
    </div>
  );
}

export default Everything;
