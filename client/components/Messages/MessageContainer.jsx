'use client';

import { useAddMessageMutation, useGetMessagesQuery } from '@/features/auth/authApiSlice.jsx';
import { getAllAuthState } from '@/features/auth/authSlice.jsx';
import sweetAlert from '@/helpers/sweetAlert.jsx';
import useFormFields from '@/hooks/useFormFields.jsx';
import { useEffect, useRef, useState } from 'react';
import { BsCheckAll } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

function MessageContainer({ orderId }) {
  const { user } = useSelector(getAllAuthState);
  const { data, error } = useGetMessagesQuery(orderId, { skip: Boolean(!user) });
  const [messages, setMessages] = useState([]);
  const { input, setInput, handleInputChange } = useFormFields({ text: '', recipentId: undefined });
  const [addMessage, { data: addMessageData, error: addMessageError }] = useAddMessageMutation();
  const dispatch = useDispatch();
  const scrollChat = useRef();

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.text) return sweetAlert('Text is required!');
    dispatch(addMessage({ id: orderId, data: input }));
  };

  // Time formate function
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setMessages(data.messagesData);
      setInput({ ...input, recipentId: data.recipentId });
    }
    if (error) {
      sweetAlert(error.data.message);
    }
  }, [data, error]);
  useEffect(() => {
    if (addMessageData) {
      setMessages([...messages, addMessageData.newMsg]);
      setInput({ ...input, text: '' });
    }
    if (addMessageError) {
      sweetAlert(addMessageError.addMessageData.message);
    }
  }, [addMessageData, addMessageError]);

  useEffect(() => {
    scrollChat.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className='h-[80vh] mt-52'>
        <div className='max-h-[60vh]   flex flex-col justify-center items-center'>
          <div className='bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col'>
            <div className='mt-8'>
              <div className='space-y-4 h-[50vh] overflow-y-auto pr-4 '>
                {messages?.length > 0 &&
                  messages.map((item) => (
                    <div
                      ref={scrollChat}
                      key={item?.id}
                      className={`flex ${item?.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`inline-block rounded-lg ${item?.senderId === user?.id ? 'bg-[#1DBF73] text-white' : 'bg-gray-100 text-gray-800'} px-4 py-2 max-w-xs break-all`}>
                        <p>{item?.text}</p>
                        <span className='text-sm text-gray-600'>{formatTime(item?.createdAt)}</span>
                        <span>{item?.senderId === user?.id && item?.isRead && <BsCheckAll />}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className='mt-8 flex'>
              <input
                type='text'
                className='rounded-full py-2 px-4 mr-2 w-full bg-slate-100 focus:outline-none'
                placeholder='Type a message...'
                name='text'
                onChange={handleInputChange}
                value={input.text}
              />
              <button
                type='submit'
                className='bg-[#1DBF73] text-white rounded-full px-4 py-2'>
                <FaRegPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageContainer;
