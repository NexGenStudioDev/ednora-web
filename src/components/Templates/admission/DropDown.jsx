import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
   setAdmission,
   setOneAdmission,
} from '../../../store/AdmissionSlice';
import { IoChevronDown } from 'react-icons/io5';

const Dropdown = ({
   placeholder = 'Select an option',
   label,
   options = [],
   onChange,
   name,
   isRequired = false,
   required = false,
   errorMessage,
   icon: Icon,
   helperText,
   className = '',
   disabled = false,
}) => {
   const dispatch = useDispatch();
   const admission = useSelector(state => state.admission.admission);
   const fieldIndex = admission.findIndex(item => item.name === name);

   const needsValidation = isRequired || required;
   const displayLabel = label || placeholder;

   const [selectedOption, setSelectedOption] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const [isTouched, setIsTouched] = useState(false);

   const dropdownRef = useRef(null);

   // Sync from Redux
   useEffect(() => {
      const reduxVal = admission[fieldIndex]?.value;
      if (reduxVal !== undefined && reduxVal !== null && reduxVal !== '') {
         setSelectedOption(String(reduxVal));
      }
   }, [admission, fieldIndex]);

   // Close when clicking outside
   useEffect(() => {
      const handleClickOutside = event => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const isError =
      isTouched &&
      needsValidation &&
      (!selectedOption || selectedOption === placeholder);

   const toggleDropdown = () => {
      if (disabled) return;
      setIsOpen(prev => !prev);
      setIsTouched(true);
   };

   const handleOptionClick = option => {
      setSelectedOption(option);
      setIsOpen(false);
      setIsTouched(true);

      // Propagate to parent handler
      if (onChange) {
         onChange({
            target: {
               name: name,
               value: option,
            },
         });
      }

      // Sync to Redux store
      const payload = { name, value: option };
      if (fieldIndex !== -1) {
         dispatch(setOneAdmission(payload));
      } else {
         dispatch(setAdmission(payload));
      }
   };

   return (
      <div
         className={`relative w-full flex flex-col gap-1.5 ${className}`}
         ref={dropdownRef}
      >
         {displayLabel && (
            <label className='text-xs font-semibold text-slate-700 flex items-center justify-between'>
               <span className='flex items-center gap-1'>
                  {displayLabel}
                  {needsValidation && (
                     <span className='text-rose-500 font-bold' title='Required'>
                        *
                     </span>
                  )}
               </span>
               {helperText && (
                  <span className='text-[11px] font-normal text-slate-400'>
                     {helperText}
                  </span>
               )}
            </label>
         )}

         <button
            type='button'
            disabled={disabled}
            onClick={toggleDropdown}
            className={`w-full flex items-center justify-between rounded-xl border bg-white py-2.5 sm:py-3 text-sm text-left transition-all duration-150 shadow-xs outline-none ${
               Icon ? 'pl-10 pr-3.5' : 'px-4'
            } ${
               isError
                  ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15'
                  : isOpen
                    ? 'border-blue-600 ring-3 ring-blue-500/15'
                    : 'border-slate-200 hover:border-slate-300'
            } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'cursor-pointer'}`}
         >
            {Icon && (
               <div className='absolute left-3.5 pointer-events-none text-slate-400'>
                  <Icon size={16} />
               </div>
            )}

            <span
               className={`truncate block ${
                  selectedOption && selectedOption !== placeholder
                     ? 'text-slate-800 font-medium'
                     : 'text-slate-400'
               }`}
            >
               {selectedOption && selectedOption !== placeholder
                  ? selectedOption
                  : placeholder}
            </span>

            <IoChevronDown
               size={16}
               className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
               }`}
            />
         </button>

         {isOpen && (
            <div className='absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-50'>
               {options.length === 0 ? (
                  <div className='px-4 py-3 text-xs text-slate-400 text-center'>
                     No options available
                  </div>
               ) : (
                  options.map((option, index) => {
                     const isSelected = selectedOption === option;
                     return (
                        <div
                           key={index}
                           onClick={() => handleOptionClick(option)}
                           className={`flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              isSelected
                                 ? 'bg-blue-50 font-semibold text-blue-700'
                                 : 'text-slate-700 hover:bg-slate-50'
                           }`}
                        >
                           <span>{option}</span>
                           {isSelected && (
                              <span className='w-2 h-2 rounded-full bg-blue-600'></span>
                           )}
                        </div>
                     );
                  })
               )}
            </div>
         )}

         {isError && (
            <p className='text-xs text-rose-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in duration-200'>
               <svg
                  className='w-3.5 h-3.5 shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
               >
                  <path
                     fillRule='evenodd'
                     d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                     clipRule='evenodd'
                  />
               </svg>
               <span>
                  {errorMessage || `${displayLabel} is required`}
               </span>
            </p>
         )}
      </div>
   );
};

Dropdown.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   options: PropTypes.array,
   onChange: PropTypes.func,
   name: PropTypes.string.isRequired,
   isRequired: PropTypes.bool,
   required: PropTypes.bool,
   errorMessage: PropTypes.string,
   icon: PropTypes.elementType,
   helperText: PropTypes.string,
   className: PropTypes.string,
   disabled: PropTypes.bool,
};

export default React.memo(Dropdown);
