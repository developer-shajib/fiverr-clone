'use client';

import Image from 'next/image.js';
import { RxCross2 } from 'react-icons/rx';

function ImageUpload({ files, setFile, image, setImage }) {
  //Add or File change handler
  const handleFileChange = (e) => {
    const uploadFiles = Array.from(e.target.files);
    setFile([...files, ...uploadFiles]);
  };

  // Image Remove handler
  const handleRemoveImage = (file) => {
    const removeFile = files.filter((item) => item != file);
    setFile(removeFile);
  };

  // Old Image Remove Handler
  const handleRemoveOldImage = (imageFile) => {
    const removeImage = image?.filter((item) => item != imageFile);
    setImage(removeImage);
  };

  return (
    <div>
      <div className='flex  items-center px-2'>
        <div className='rounded-lg  bg-gray-50 w-full'>
          <div className='m-4'>
            <div className='flex items-center justify-center w-full'>
              <label
                onClick={(e) => e.stopPropagation()}
                className='flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300'>
                <div className='flex flex-col items-center justify-center pt-7'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-12 h-12 text-gray-400 group-hover:text-gray-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>Select a photo</p>
                </div>
                <input
                  type='file'
                  id='gigFiles'
                  onChange={handleFileChange}
                  className='opacity-0'
                  multiple={true}
                  accept='image/gif, image/jpeg, image/png'
                />
              </label>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {image &&
                image?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='overflow-hidden relative group'>
                      <i
                        onClick={() => handleRemoveOldImage(item)}
                        className='mdi mdi-close absolute right-1 text-white bg-red-600 rounded-full cursor-pointer z-20 hidden group-hover:block'>
                        <RxCross2 />
                      </i>
                      <div className='relative h-20 w-20 rounded-md'>
                        <Image
                          src={item}
                          fill
                          alt='Gigs'
                          blurDataURL='data:...'
                          placeholder='blur'
                          quality={100}
                        />
                      </div>
                    </div>
                  );
                })}

              {files?.map((file, index) => {
                return (
                  <div
                    key={index}
                    className='overflow-hidden relative group'>
                    <i
                      onClick={() => handleRemoveImage(file)}
                      className='mdi mdi-close absolute right-1 text-white bg-red-600 rounded-full cursor-pointer z-20 hidden group-hover:block'>
                      <RxCross2 />
                    </i>
                    <div className='relative h-20 w-20 rounded-md'>
                      <Image
                        src={URL.createObjectURL(file)}
                        fill
                        alt='Gigs'
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
