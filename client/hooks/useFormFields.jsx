'use client';

import { useState } from 'react';

const useFormFields = (initialState) => {
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return { input, setInput, handleInputChange };
};

export default useFormFields;
