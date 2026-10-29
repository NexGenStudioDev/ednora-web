import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
   setAdmission,
   setOneAdmission,
} from '../../../store/AdmissionSlice';

const InputField = ({
   placeholder,
   label,
   type = 'text',
   name,
   required = false,
   onChange,
   icon: Icon,
   helperText,
   maxLength,
   inputMode,
   autoComplete,
   className = '',
   disabled = false,
}) => {
   const dispatch = useDispatch();
   const admission = useSelector(state => state.admission.admission);
   const fieldIndex = admission.findIndex(item => item.name === name);

   const [value, setValue] = useState('');
   const [isTouched, setIsTouched] = useState(false);
   const [isFocused, setIsFocused] = useState(false);

   // Sync value from Redux store when available
   useEffect(() => {
      const reduxVal = admission[fieldIndex]?.value;
      if (reduxVal !== undefined && reduxVal !== null) {
         setValue(String(reduxVal));
      }
   }, [admission, fieldIndex]);

   const isError = isTouched && required && String(value).trim() === '';
   const displayLabel = label || placeholder;
   const inputId = name || placeholder?.replace(/\s+/g, '').toLowerCase();

   const handleChange = e => {
      const newVal = e.target.value;
      setValue(newVal);

      // Immediately propagate to parent form state
      if (onChange) {
         onChange({
            target: {
               name: name,
               value: newVal,
            },
         });
      }

      // Sync to Redux store
      const payload = { name, value: newVal };
      if (fieldIndex === -1) {
         dispatch(setAdmission(payload));
      } else {
         dispatch(setOneAdmission(payload));
      }
   };

   const handleBlur = () => {
      setIsTouched(true);
      setIsFocused(false);

      // Final dispatch to store on blur
      const payload = { name, value };
      if (fieldIndex === -1) {
         dispatch(setAdmission(payload));
      } else {
         dispatch(setOneAdmission(payload));
      }
   };

   const handleFocus = () => {
      setIsFocused(true);
   };

   return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
         {displayLabel && (
            <label
               htmlFor={inputId}
               className='text-xs font-semibold text-slate-700 flex items-center justify-between'
            >
               <span className='flex items-center gap-1'>
                  {displayLabel}
                  {required && (
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

         <div className='relative flex items-center w-full'>
            {Icon && (
               <div className='absolute left-3.5 pointer-events-none text-slate-400'>
                  <Icon size={16} />
               </div>
            )}

            <input
               id={inputId}
               name={name}
               type={type}
               placeholder={placeholder}
               value={value}
               required={required}
               disabled={disabled}
               maxLength={maxLength}
               inputMode={inputMode}
               autoComplete={autoComplete}
               onChange={handleChange}
               onFocus={handleFocus}
               onBlur={handleBlur}
               className={`w-full rounded-xl border bg-white py-2.5 sm:py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-150 shadow-xs outline-none ${
                  Icon ? 'pl-10 pr-4' : 'px-4'
               } ${
                  isError
                     ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15'
                     : isFocused
                       ? 'border-blue-600 ring-3 ring-blue-500/15'
                       : 'border-slate-200 hover:border-slate-300'
               } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}`}
            />
         </div>

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
               <span>{displayLabel} is required</span>
            </p>
         )}
      </div>
   );
};

InputField.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   type: PropTypes.string,
   name: PropTypes.string.isRequired,
   required: PropTypes.bool,
   onChange: PropTypes.func,
   icon: PropTypes.elementType,
   helperText: PropTypes.string,
   maxLength: PropTypes.number,
   inputMode: PropTypes.string,
   autoComplete: PropTypes.string,
   className: PropTypes.string,
   disabled: PropTypes.bool,
};

export default React.memo(InputField);
