'use client';
import { useUpdateUserMutation } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState, setUserInfo } from '@/features/auth/authSlice.jsx';
import ReactSpinner from '@/helpers/reactSpinner.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import useFormFields from '@/hooks/useFormFields.jsx';
import Image from 'next/image.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const [image, setImage] = useState('');
  const { user } = useSelector(getAllAuthState);
  const [imageHover, setImageHover] = useState(false);
  const { input, setInput, handleInputChange } = useFormFields({ username: '', fullName: '', description: '' });
  const [updateUser, { data, isLoading, isSuccess, error }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const labelClassName = 'mb-2 text-md font-medium text-gray-900  dark:text-white';
  const inputClassName = 'block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500';

  // form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.username || !input.fullName) return sweetAlert('All fields are required!');

    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('fullName', input.fullName);
    formData.append('description', input.description);

    if (image) {
      formData.append('profile', image);
    }

    dispatch(updateUser({ data: formData, id: user.id }));
  };

  useEffect(() => {
    if (isSuccess) {
      sweetAlert(data.message, 'success');
      dispatch(setUserInfo({ user: data.user }));
    }
    if (error) {
      sweetAlert(error.data.message);
    }
  }, [isSuccess, data, error, setInput, dispatch]);

  useEffect(() => {
    if (user) setInput({ ...input, username: user?.username || '', fullName: user?.fullName || '', description: user?.description || '' });
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-start min-h-[80vh] gap-1 mt-32 mb-auto w-full mx-auto`}'>
      <h2 className='text-2xl'>Welocme to Fiverr Clone</h2>
      <h4 className='text-lg'>Please complete your profile to get started</h4>
      <div className='flex flex-col items-center w-full gap-5'>
        <div
          className='flex flex-col items-center '
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}>
          <label
            className={labelClassName}
            htmlFor=''>
            Select a profile Picture
          </label>
          <div className='bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative cursor-pointer '>
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt='profile'
                fill
                className='rounded-full cursor-pointer'
              />
            ) : (
              <>
                {user?.profileImage ? (
                  <Image
                    src={user?.profileImage}
                    alt={user?.username}
                    fill
                    className=' cursor-pointer rounded-full'
                  />
                ) : (
                  <span className='text-6xl text-white cursor-pointer'>{user && user?.email && user?.email.split('')[0].toUpperCase()}</span>
                )}
              </>
            )}
            <div className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
              <span className={` flex items-center justify-center  relative h-full w-full cursor-pointer`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-12 h-12 text-white absolute'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='file'
                  onChange={(e) => setImage(e.target.files[0])}
                  className='opacity-0 h-full w-full cursor-pointer'
                  multiple={false}
                  name='profileImage'
                  accept='image/gif, image/jpeg, image/png'
                />
              </span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleFormSubmit}
          action=''
          className='flex flex-col items-center w-full gap-5'>
          <div className='flex gap-4 w-[500px]'>
            <div>
              <label
                className={labelClassName}
                htmlFor='username'>
                Please select a username
              </label>
              <input
                className={inputClassName}
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                value={input.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                className={labelClassName}
                htmlFor='fullName'>
                Please enter your full Name
              </label>
              <input
                className={inputClassName}
                type='text'
                name='fullName'
                id='fullName'
                placeholder='Full Name'
                value={input.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex flex-col w-[500px]'>
            <label
              className={labelClassName}
              htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={input.description}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder='description'></textarea>
          </div>
          <button
            className='border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md'
            type='submit'>
            {isLoading ? <ReactSpinner /> : 'Set Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
