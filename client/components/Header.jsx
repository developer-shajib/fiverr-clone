'use client';

import Link from 'next/link.js';
import { useRouter } from 'next/navigation.js';
import { useState } from 'react';
import FiverrLogo from './Data/FiverrLogo.jsx';
import { getAllAuthState, sellerModeChange, setAuthModal, setLogoutEmpty, setUserInfo } from '@/features/auth/authSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { TbWorld } from 'react-icons/tb';
import { useLogoutMutation, useMeQuery } from '@/features/auth/authApiSlice.jsx';
import Cookies from 'js-cookie';
import Image from 'next/image.js';
import useDropdownPopup from '@/hooks/useDropDown.jsx';

function Header() {
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState('');
  const { user, isSeller } = useSelector(getAllAuthState);
  const dispatch = useDispatch();
  const token = Cookies.get('accessToken');
  const { data, isLoading, isSuccess, error, isError } = useMeQuery(undefined, { skip: Boolean(!token) });
  const { isOpen, toggleMenu, dropDownRef } = useDropdownPopup();
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  // SignIn Modal
  const handleLogin = () => {
    dispatch(setAuthModal({ singIn: true }));
  };

  // SignUp Modal

  const handleSignup = () => {
    dispatch(setAuthModal({ signUp: true }));
  };

  // Buyer or Seller Mood switch
  const handleModeSwitch = () => {
    if (isSeller) {
      router.push('/buyer/orders');
      dispatch(sellerModeChange());
    } else {
      router.push('/seller');
      dispatch(sellerModeChange());
    }
  };

  // Logout Handler
  const handleLogout = () => {
    dispatch(logout());
  };

  // All Links
  const links = [
    { linkName: 'Fiverr Business', handler: '#', type: 'link' },
    { linkName: 'Explore', handler: '#', type: 'link' },
    { linkName: 'English', handler: '#', type: 'link' },
    { linkName: 'Become a Seller', handler: '#', type: 'link' },
    { linkName: 'Sign in', handler: handleLogin, type: 'button' },
    { linkName: 'Join', handler: handleSignup, type: 'button2' }
  ];

  useEffect(() => {
    const positionNavbar = () => {
      window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
    };
    window.addEventListener('scroll', positionNavbar);
    return () => window.removeEventListener('scroll', positionNavbar);
  }, [router.pathname]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ user: data?.user }));
    }
    if (error) {
      dispatch(setLogoutEmpty());
    }
  }, [data, token, isSuccess, dispatch]);

  useEffect(() => {
    if (logoutSuccess) {
      dispatch(setLogoutEmpty());
      router.push('/');
    }
  }, [logoutSuccess, dispatch, router]);

  return (
    <>
      <nav className={`w-full px-16 flex gap-5 justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${navFixed || user ? `fixed bg-white border-b border-gray-200` : 'absolute bg-transparent border-transparent'}`}>
        <div>
          <Link href='/'>
            <FiverrLogo color={!navFixed && !user ? '#e8edf2' : '#404145'} />
          </Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${searchData}`);
          }}
          className={`flex ${navFixed || user ? 'opacity-100 block' : 'opacity-0 hidden'} sm:hidden md:hidden lg:flex `}>
          <input
            type='text'
            placeholder='What service are you looking for today?'
            className='w-[30rem] py-2.5 px-4 border'
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button
            type='submit'
            className='bg-gray-900 hover:bg-gray-500 transition-all py-1.5 text-white w-16 flex justify-center items-center'>
            <IoSearchOutline className='fill-white text-white h-6 w-6' />
          </button>
        </form>
        {!user ? (
          <ul className='flex gap-4 items-center'>
            {links?.map(({ linkName, handler, type }) => {
              return (
                <li
                  key={linkName}
                  className={`${navFixed ? 'text-black' : 'text-slate-300'} font-medium `}>
                  {type === 'link' && (
                    <Link
                      className='tracking-tighter flex items-center gap-2 sm:hidden md:hidden lg:flex  '
                      href={handler}>
                      {linkName == 'English' && <TbWorld />} {linkName}
                    </Link>
                  )}
                  {type === 'button' && <button onClick={handler}>{linkName}</button>}
                  {type === 'button2' && (
                    <button
                      onClick={handler}
                      className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
                        navFixed ? 'border-[#1DBF73] text-[#1DBF73]' : 'border-slate-300 text-slate-300'
                      } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}>
                      {linkName}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className='flex gap-10 items-center'>
            {isSeller && (
              <li
                className='cursor-pointer text-[#1DBF73] font-medium'
                onClick={() => router.push('/seller/gigs/create')}>
                Create Gig
              </li>
            )}
            <li
              className='cursor-pointer text-[#1DBF73] font-medium'
              onClick={() => {
                isSeller ? router.push('/seller/orders') : router.push('/buyer/orders');
              }}>
              Orders
            </li>

            <li
              className='cursor-pointer font-medium'
              onClick={handleModeSwitch}>
              {isSeller ? 'Switch To Buyer' : 'Switch To Seller'}
            </li>

            <li
              className='cursor-pointer relative'
              onClick={(e) => {
                e.stopPropagation();
              }}
              title='Profile'>
              {user?.profileImage ? (
                <Image
                  onClick={toggleMenu}
                  src={user.profileImage}
                  alt='Profile'
                  width={40}
                  height={40}
                  className='rounded-full w-10 h-10 object-cover'
                />
              ) : (
                <div
                  onClick={toggleMenu}
                  className='bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative'>
                  <Link
                    href=''
                    className='text-xl text-white'>
                    {user && user?.email && user?.email.split('')[0].toUpperCase()}
                  </Link>
                </div>
              )}
              {isOpen && (
                <ul className='absolute right-0 bg-slate-50 rounded-md shadow-md w-56  '>
                  <li className='w-full flex justify-center'>
                    <Link
                      className='py-2 px-2 hover:bg-slate-200 transition-all duration-300 text-lg w-full block'
                      href={'/profile'}>
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className='w-full flex justify-center'>
                    <Link
                      className='py-2 px-2 hover:bg-slate-200 transition-all duration-300 text-lg w-full block'
                      href=''>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Header;
