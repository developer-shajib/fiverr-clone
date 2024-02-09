'use client';

import { useSignInMutation, useSignUpMutation } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState, setAuthModal, setMessageEmpty, setUserInfo } from '@/features/auth/authSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import useFormFields from '@/hooks/useFormFields.jsx';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import Cookies from 'js-cookie';

function AuthWrapper({ type }) {
  const { user, users, successMessage, error, showSignInModal, showSignUpModal } = useSelector(getAllAuthState);
  const { input, setInput, handleInputChange } = useFormFields({ email: '', password: '' });
  const dispatch = useDispatch();
  const [signUp, { data, isLoading, isSuccess, isError, error: singUpError }] = useSignUpMutation();
  const [signIn, { data: singInData, isLoading: singInLoading, isSuccess: singInSuccess, isError: singInIsError, error: singInError }] = useSignInMutation();

  // <!-- From submit Handler -->
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) return sweetAlert('All fields are required');

    if (showSignUpModal) {
      dispatch(signUp(input));
    }
    if (showSignInModal) {
      dispatch(signIn(input));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.token) Cookies.set('accessToken', data?.token, { expires: 7, path: '/', secure: true });

      sweetAlert(data.message, 'success');
      dispatch(setUserInfo({ user: data.user }));
      setInput((prevState) => ({ ...prevState, email: '', password: '' }));
      dispatch(setAuthModal({ signIn: false, signUp: false }));
    }
    if (singUpError) {
      sweetAlert(singUpError?.data?.message);
      setInput((prevState) => ({ ...prevState, email: '', password: '' }));
    }
  }, [isSuccess, data, singUpError, dispatch, setInput]);
  useEffect(() => {
    if (singInSuccess) {
      if (singInData?.token) Cookies.set('accessToken', singInData?.token, { expires: 7, path: '/', secure: true });
      sweetAlert(singInData.message, 'success');
      dispatch(setUserInfo({ user: singInData.user }));
      setInput((prevState) => ({ ...prevState, email: '', password: '' }));
      dispatch(setAuthModal({ signIn: false, signUp: false }));
    }
    if (singInError) {
      sweetAlert(singInError?.data?.message);
      setInput((prevState) => ({ ...prevState, email: '', password: '' }));
    }
  }, [singInSuccess, singInData, singInError, dispatch, setInput]);

  return (
    <>
      {(showSignInModal || showSignUpModal) && (
        <div className='fixed top-0 z-[100]'>
          <div
            className='h-[100vh] w-[100vw] backdrop-blur-md fixed top-0'
            id='blur-div'></div>
          <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
            <div
              className='fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center'
              id='auth-modal'>
              <button
                className='w-full flex justify-end pr-5 pt-5 text-xl'
                onClick={() => dispatch(setAuthModal({ signIn: false, signUp: false }))}>
                <RxCross2 />
              </button>

              <div className='flex flex-col justify-center items-center p-8 pt-0 gap-7'>
                <h3 className='text-2xl font-semibold text-slate-700'>{showSignInModal ? 'Sign In' : 'Join'} to Fiverr</h3>
                <div className='flex flex-col gap-5'>
                  <button className='text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative'>
                    <MdFacebook className='absolute left-4 text-2xl' />
                    Continue with Facebook
                  </button>
                  <button className='border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative'>
                    <FcGoogle className='absolute left-4 text-2xl' />
                    Continue with Google
                  </button>
                </div>

                <div className='relative  w-full text-center'>
                  <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                    <span className='bg-white relative z-10 px-2'>OR</span>
                  </span>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className='flex flex-col gap-5'>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email / Username'
                    className='border border-slate-300 p-3 w-80'
                    onChange={handleInputChange}
                    value={input.email}
                  />
                  <input
                    type='password'
                    placeholder='Password'
                    className='border border-slate-300 p-3 w-80'
                    name='password'
                    onChange={handleInputChange}
                    value={input.password}
                  />
                  <button
                    type='submit'
                    className='bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80'>
                    {showSignInModal ? 'Login' : 'Register'}
                  </button>
                </form>
              </div>
              <div className='py-5 w-full flex items-center justify-center border-t border-slate-400'>
                <span className='text-sm  text-slate-700'>
                  {' '}
                  {showSignInModal ? (
                    <>
                      Not a member yet?&nbsp;
                      <span
                        className='text-[#1DBF73] cursor-pointer'
                        onClick={() => {
                          dispatch(setAuthModal({ singIn: false, signUp: true }));
                        }}>
                        Join Now
                      </span>
                    </>
                  ) : (
                    <>
                      Already a member?&nbsp;
                      <span
                        className='text-[#1DBF73] cursor-pointer'
                        onClick={() => {
                          dispatch(setAuthModal({ singIn: true, signUp: false }));
                        }}>
                        Login Now
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthWrapper;
