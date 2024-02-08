'use client';

import { useEffect, useRef, useState } from 'react';

//  open & close popup custom hook
const useDropdownPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  // Toggle Menu
  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { isOpen, toggleMenu, dropDownRef };
};

export default useDropdownPopup;
