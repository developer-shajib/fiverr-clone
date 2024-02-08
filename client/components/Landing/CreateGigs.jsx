'use client';

import useFormFields from '@/hooks/useFormFields.jsx';
import { useState } from 'react';
import { categories } from '../Data/Categories.jsx';
import { RxCross2 } from 'react-icons/rx';
import ImageUpload from './ImageUpload.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import { useCreateGigMutation } from '@/features/auth/authApiSlice.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation.js';

function CreateGigs() {
  const [files, setFile] = useState([]);
  const [features, setFeatures] = useState([]);
  const [createGig, { isError, isSuccess, error, data, isLoading }] = useCreateGigMutation();
  const { input, setInput, handleInputChange } = useFormFields({
    title: '',
    category: '',
    description: '',
    deliveryTime: 0,
    revisions: 0,
    features: '',
    price: 0,
    shortDesc: ''
  });
  const dispatch = useDispatch();
  const router = useRouter();

  // Add Feature Handler
  const handleAddFeature = () => {
    if (input.features) {
      setFeatures([...features, input.features]);
      setInput({ ...input, features: '' });
    }
  };

  // Remove Feature Handler
  const handleRemoveFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  // Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.title || !input.category || !input.description || !input.deliveryTime || !input.revisions || !features || !input.price || input.price.length < 0 || !input.shortDesc) {
      return sweetAlert('All Input fields are required');
    }

    // Form Data
    const formData = new FormData();
    formData.append('title', input.title);
    formData.append('category', input.category);
    formData.append('description', input.description);
    formData.append('deliveryTime', input.deliveryTime);
    formData.append('revisions', input.revisions);
    formData.append('features', features);
    formData.append('price', input.price);
    formData.append('shortDesc', input.shortDesc);
    if (files) {
      files.forEach((file) => formData.append('gigImages', file));
    }

    dispatch(createGig(formData));
  };

  // if state value negative number
  if (input.revisions < 0) {
    setInput((prevState) => ({ ...prevState, revisions: 0 }));
  }
  if (input.price < 0) {
    setInput((prevState) => ({ ...prevState, price: 0 }));
  }
  if (input.deliveryTime < 0) {
    setInput((prevState) => ({ ...prevState, deliveryTime: 0 }));
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/seller/gigs');
      sweetAlert(data.message, 'success');
      setInput((prevState) => ({ ...prevState, title: '', category: '', description: '', deliveryTime: 0, revisions: 0, features: '', price: 0, shortDesc: '' }));
      setFile([]);
      setFeatures([]);
    }
    if (error) {
      sweetAlert(error?.data?.message);
    }
  }, [isSuccess, data, error, setInput]);

  const inputClassName = 'block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500';
  const labelClassName = 'mb-2 text-lg font-medium text-gray-900  dark:text-white';

  return (
    <div className='mt-32 mb-32 w-full mx-auto '>
      <div className='min-h-[80vh] my-10 mt-0 px-32'>
        <h1 className='text-5xl text-gray-900 mb-5'>Create a new Gig</h1>
        <h3 className='text-2xl text-gray-900 mb-2'>Enter the details to create the gig</h3>
        <form
          onSubmit={handleFormSubmit}
          action=''
          className='flex flex-col gap-5 mt-7'>
          <div className='grid grid-cols-2 gap-11'>
            <div>
              <label
                htmlFor='title'
                className={labelClassName}>
                Gig Title
              </label>
              <input
                name='title'
                value={input.title}
                onChange={handleInputChange}
                type='text'
                id='title'
                className={inputClassName}
                placeholder="e.g. I will do something I'm really good at"
              />
            </div>
            <div>
              <label
                htmlFor='categories'
                className={labelClassName}>
                Select a Category
              </label>
              <select
                id='categories'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3'
                name='category'
                onChange={handleInputChange}
                defaultValue='Choose a Category'>
                {categories?.map(({ name }) => (
                  <option
                    key={name}
                    value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor='description'
              className={labelClassName}>
              Gig Description
            </label>
            <textarea
              id='description'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Write a short description'
              name='description'
              value={input.description}
              onChange={handleInputChange}></textarea>
          </div>
          <div className='grid grid-cols-2 gap-11'>
            <div>
              <label htmlFor='delivery'>Delivery Time</label>
              <input
                type='number'
                className={inputClassName}
                id='delivery'
                name='deliveryTime'
                value={input.deliveryTime}
                onChange={handleInputChange}
                placeholder='Minimum Delivery Time'
              />
            </div>
            <div>
              <label
                htmlFor='revision'
                className={labelClassName}>
                Revisions
              </label>
              <input
                type='number'
                id='revision'
                className={inputClassName}
                placeholder='Max Number of Revisions'
                name='revisions'
                value={input.revisions}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-11'>
            <div>
              <label
                htmlFor='features'
                className={labelClassName}>
                Features
              </label>
              <div className='flex gap-3 items-center mb-5'>
                <input
                  type='text'
                  id='features'
                  className={inputClassName}
                  placeholder='Enter a Feature Name'
                  name='features'
                  value={input.features}
                  onChange={handleInputChange}
                />
                <button
                  type='button'
                  className='focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-2 rounded-md '
                  onClick={handleAddFeature}>
                  Add
                </button>
              </div>
              <ul className='flex gap-2 flex-wrap'>
                {features?.map((feature, index) => {
                  return (
                    <li
                      key={feature + index.toString()}
                      className='flex gap-2 items-center py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200'>
                      <span>{feature}</span>
                      <span
                        className='text-gray-600 font-extrabold'
                        onClick={() => handleRemoveFeature(index)}>
                        <RxCross2 />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <label
                htmlFor='image'
                className={labelClassName}>
                Gig Images
              </label>
              <div>
                <ImageUpload
                  files={files}
                  setFile={setFile}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-11'>
            <div>
              <label
                htmlFor='shortDesc'
                className={labelClassName}>
                Short Description
              </label>
              <input
                type='text'
                className={`${inputClassName} `}
                id='shortDesc'
                placeholder='Enter a short description.'
                name='shortDesc'
                value={input.shortDesc}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor='price'
                className={labelClassName}>
                Gig Price ( $ )
              </label>
              <input
                type='number'
                className={`${inputClassName} `}
                id='price'
                placeholder='Enter a price'
                name='price'
                value={input.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              className='border   text-lg font-semibold px-5 py-2   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md'
              type='submit'>
              {isLoading ? 'Loading ...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGigs;
