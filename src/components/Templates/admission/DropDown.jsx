import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
   setAdmission,
   setOneAdmission,
} from '../../../store/AdmissionSlice';

const Dropdown = ({
   placeholder,
   options,
   onChange,
   name,
   isRequired = false,
   errorMessage = 'This field is required.',
}) => {
   const dispatch = useDispatch();
   const admission = useSelector(state => state.admission.admission);
   const find_index = admission.findIndex(item => item.name === name);

   // Initialize with value from Redux if available
   const initialValue =
      find_index !== -1 ? admission[find_index].value : placeholder;
   const [selectedOption, setSelectedOption] = useState(initialValue);
   const [isOpen, setIsOpen] = useState(false);
   const [isError, setIsError] = useState(false);

   const dropdownRef = useRef(null);

   const toggleDropdown = () => setIsOpen(prev => !prev);

   const handleClickOutside = event => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target)
      ) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener(
            'mousedown',
            handleClickOutside,
         );
   }, []);

   // Sync selectedOption with Redux
   useEffect(() => {
      if (selectedOption !== placeholder) {
         const idx = admission.findIndex(item => item.name === name);
         if (idx !== -1) {
            dispatch(
               setOneAdmission({ name, value: selectedOption }),
            );
         } else {
            dispatch(setAdmission({ name, value: selectedOption }));
         }
      }
   }, [selectedOption, admission]);

   const validateDropdown = () => {
      if (
         isRequired &&
         (selectedOption === placeholder || !selectedOption)
      ) {
         setIsError(true);
      } else {
         setIsError(false);
      }
   };
   const handleOptionClick = option => {
      setSelectedOption(option);
      onChange && onChange({ target: { name, value: option } });
      setIsOpen(false);
      setIsError(false);
   };

   const handleBlur = () => validateDropdown();

   return (
      <div
         className='relative min-[630px]:max-w-[248px] w-full'
         ref={dropdownRef}
      >
         <div
            tabIndex={0}
            onClick={toggleDropdown}
            onBlur={handleBlur}
            className={`border cursor-pointer w-full flex items-center justify-between gap-2 rounded-[8px] px-4 py-3 text-xs text-[#333333] ${
               isError ? 'border-red-500' : 'border-[#A0A0A080]'
            }`}
         >
            {selectedOption}
            <svg
               width='14'
               height='8'
               viewBox='0 0 14 8'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
               className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
               <path
                  d='M12.88 1L7.99 5.89C7.4125 6.4675 6.4675 6.4675 5.89 5.89L1 1'
                  stroke='#131740'
                  strokeWidth='1.8'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
         </div>

         {isOpen && (
            <div className='absolute z-10 overflow-hidden divide-y divide-[#D7D7D7] bg-white border border-[#A0A0A080] rounded-[8px] mt-2 w-full shadow-lg '>
               {options.map((option, index) => (
                  <div
                     key={index}
                     onClick={() => handleOptionClick(option)}
                     className='flex items-center gap-2 px-4 py-3 text-xs text-[#333333] cursor-pointer hover:bg-[#FAFAFA]'
                  >
                     <div
                        className={`w-4 h-4 border-2 bg-white rounded-full flex items-center justify-center ${
                           selectedOption === option
                              ? 'border-[#333333]'
                              : 'border-gray-400'
                        }`}
                     >
                        {selectedOption === option && (
                           <div className='w-2 h-2 rounded-full bg-[#333333]'></div>
                        )}
                     </div>
                     {option}
                  </div>
               ))}
            </div>
         )}

         {isError && (
            <p className='text-red-500 text-xs mt-1'>
               {errorMessage}
            </p>
         )}
      </div>
   );
};

export default Dropdown;
