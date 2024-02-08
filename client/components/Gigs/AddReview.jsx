'use client';
import { useAddReviewMutation } from '@/features/auth/authApiSlice.jsx';
import { setAddReview } from '@/features/auth/authSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import useFormFields from '@/hooks/useFormFields.jsx';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

function AddReview({ gigId }) {
  const { input, setInput, handleInputChange } = useFormFields({ reviewText: '', rating: 0 });
  const [addReview, { data, isSuccess, error }] = useAddReviewMutation();
  const dispatch = useDispatch();

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.reviewText || !input.rating) sweetAlert('Text and rating is required!');

    dispatch(addReview({ id: gigId, data: input }));
    setInput({ ...input, reviewText: '', rating: 0 });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAddReview(data.review));
    }
    if (error) {
      sweetAlert(error.data.message);
    }
  }, [isSuccess, error, data, dispatch]);

  return (
    <>
      <div className='mb-10'>
        <h3 className='text-2xl my-5 font-normal   text-[#404145]'>Give Kishan Sheth a Review</h3>

        <form
          onSubmit={handleFormSubmit}
          className='flex  flex-col  items-start justify-start gap-3'>
          <textarea
            name='reviewText'
            id='reviewText'
            onChange={handleInputChange}
            value={input.reviewText}
            className='block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Add Review'></textarea>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((num) => (
              <FaStar
                key={num}
                className={`cursor-pointer ${input.rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setInput({ ...input, rating: num })}
              />
            ))}
          </div>
          <button
            className='flex items-center bg-[#1DBF73] text-white py-2 justify-center text-md relative rounded px-5'
            type='submit'>
            Add Review
          </button>
        </form>
      </div>
    </>
  );
}

export default AddReview;
