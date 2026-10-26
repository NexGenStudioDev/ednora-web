import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Dropdown from './DropDown';

const YourInfo = ({
   formData,
   handleInputChange,
   errors,
   showErrors,
}) => {
   const [activeBox, setActiveBox] = useState(null);

   const getBorderClass = fieldName =>
      activeBox === fieldName ? 'border-blue-500' : 'border-gray-300';

   const hasError = useCallback(
      (label, key) =>
         showErrors &&
         Array.isArray(errors) &&
         (errors.includes(label) || errors.includes(key)),
      [errors, showErrors],
   );

   const safeValue = key =>
      formData?.[key] !== undefined && formData?.[key] !== null
         ? String(formData[key])
         : '';

   const onFocus = useCallback(name => () => setActiveBox(name), []);
   const onBlur = useCallback(() => () => setActiveBox(null), []);

   return (
      <div className='sm:grid flex flex-col w-full 2xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 gap-y-10'>
         {/* First Name */}
         <FieldWrapper
            id='firstName'
            label='First Name'
            type='text'
            required
            value={safeValue('firstName')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Middle Name */}
         <FieldWrapper
            id='middleName'
            label='Middle Name'
            type='text'
            value={safeValue('middleName')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Last Name */}
         <FieldWrapper
            id='lastName'
            label='Last Name'
            type='text'
            required
            value={safeValue('lastName')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Father's Name */}
         <FieldWrapper
            id='fatherName'
            label="Father's Name"
            type='text'
            required
            value={safeValue('fatherName')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Mother's Name */}
         <FieldWrapper
            id='motherName'
            label="Mother's Name"
            type='text'
            required
            value={safeValue('motherName')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Aadhar Number */}
         <FieldWrapper
            id='AadharCardNumber'
            label='Aadhar Number'
            type='text'
            inputMode='numeric'
            required
            value={safeValue('AadharCardNumber')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Email */}
         <FieldWrapper
            id='email'
            label='Email'
            type='email'
            required
            value={safeValue('email')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Contact Number */}
         <FieldWrapper
            id='contactNumber'
            label='Contact No'
            type='tel'
            inputMode='tel'
            required
            value={safeValue('contactNumber')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Date of Birth */}
         <FieldWrapper
            id='dateOfBirth'
            label='Date of Birth'
            type='date'
            required
            value={safeValue('dateOfBirth')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Gender */}
         <DropdownWrapper
            id='gender'
            label='Gender'
            required
            value={safeValue('gender')}
            options={['Male', 'Female', 'Rather not to say']}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Nationality */}
         <DropdownWrapper
            id='nationality'
            label='Select Nationality'
            required
            value={safeValue('nationality')}
            options={[
               'India',
               'Pakistan',
               'Bangladesh',
               'Sri Lanka',
               'Nepal',
               'Bhutan',
               'Maldives',
            ]}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Street */}
         <FieldWrapper
            id='street'
            label='Street'
            type='text'
            required
            value={safeValue('street')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* City */}
         <FieldWrapper
            id='city'
            label='City'
            type='text'
            required
            value={safeValue('city')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* State */}
         <FieldWrapper
            id='state'
            label='State'
            type='text'
            required
            value={safeValue('state')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />

         {/* Pin Code */}
         <FieldWrapper
            id='pinCode'
            label='Pin Code'
            type='text'
            inputMode='numeric'
            required
            value={safeValue('pinCode')}
            handleInputChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            getBorderClass={getBorderClass}
            hasError={hasError}
         />
      </div>
   );
};

// --------- REUSABLE FIELD WRAPPER (InputField) ----------
const FieldWrapper = ({
   id,
   label,
   type,
   required,
   value,
   inputMode,
   handleInputChange,
   onFocus,
   onBlur,
   getBorderClass,
   hasError,
}) => (
   <div>
      <InputField
         id={id}
         placeholder={label}
         type={type}
         required={required}
         name={id}
         inputMode={inputMode}
         value={value}
         onChange={handleInputChange}
         onFocus={onFocus(id)}
         onBlur={onBlur()}
         className={`border ${getBorderClass(id)} rounded-md p-2`}
         aria-invalid={hasError(label, id)}
         aria-describedby={
            hasError(label, id) ? `err-${id}` : undefined
         }
      />
      {hasError(label, id) && (
         <p id={`err-${id}`} className='text-red-500 text-sm mt-1'>
            {label} is required
         </p>
      )}
   </div>
);

// --------- REUSABLE DROPDOWN WRAPPER ----------
const DropdownWrapper = ({
   id,
   label,
   required,
   value,
   options,
   handleInputChange,
   onFocus,
   onBlur,
   getBorderClass,
   hasError,
}) => (
   <div>
      <Dropdown
         id={id}
         placeholder={label}
         name={id}
         required={required}
         value={value}
         options={options}
         onChange={handleInputChange}
         onFocus={onFocus(id)}
         onBlur={onBlur()}
         className={`border ${getBorderClass(id)} rounded-md p-2`}
         aria-invalid={hasError(label, id)}
         aria-describedby={
            hasError(label, id) ? `err-${id}` : undefined
         }
      />
      {hasError(label, id) && (
         <p id={`err-${id}`} className='text-red-500 text-sm mt-1'>
            {label} is required
         </p>
      )}
   </div>
);

// PropTypes
YourInfo.propTypes = {
   formData: PropTypes.object,
   handleInputChange: PropTypes.func.isRequired,
   errors: PropTypes.array,
   showErrors: PropTypes.bool,
};

YourInfo.defaultProps = {
   formData: {},
   errors: [],
   showErrors: false,
};

export default React.memo(YourInfo);
