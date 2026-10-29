import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Dropdown from './DropDown';
import {
   FiUser,
   FiMail,
   FiPhone,
   FiCalendar,
   FiMapPin,
   FiCreditCard,
   FiGlobe,
} from 'react-icons/fi';

const YourInfo = ({
   formData = {},
   handleInputChange,
   errors = [],
   showErrors = false,
}) => {
   const isRequiredFieldMissing = (fieldKey, fieldLabel) => {
      if (!showErrors) return false;
      return (
         errors.includes(fieldLabel) ||
         errors.includes(fieldKey) ||
         !formData[fieldKey] ||
         String(formData[fieldKey]).trim() === ''
      );
   };

   return (
      <div className='flex flex-col gap-8'>
         {/* Section 1: Basic Identity */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  1
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Applicant Legal Identity
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Provide your name exactly as registered in your 10th standard certificate
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
               <InputField
                  label='First Name'
                  placeholder='e.g. Rahul'
                  name='firstName'
                  type='text'
                  required={true}
                  icon={FiUser}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('firstName', 'First Name')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Middle Name'
                  placeholder='Optional'
                  name='middleName'
                  type='text'
                  required={false}
                  icon={FiUser}
                  onChange={handleInputChange}
               />

               <InputField
                  label='Last Name'
                  placeholder='e.g. Sharma'
                  name='lastName'
                  type='text'
                  required={true}
                  icon={FiUser}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('lastName', 'Last Name')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label="Father's Full Name"
                  placeholder="e.g. Suresh Kumar Sharma"
                  name='fatherName'
                  type='text'
                  required={true}
                  icon={FiUser}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('fatherName', "Father's Name")
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label="Mother's Full Name"
                  placeholder="e.g. Anita Devi Sharma"
                  name='motherName'
                  type='text'
                  required={true}
                  icon={FiUser}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('motherName', "Mother's Name")
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Date of Birth'
                  name='dateOfBirth'
                  type='date'
                  required={true}
                  icon={FiCalendar}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('dateOfBirth', 'Date Of Birth')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Gender'
                  placeholder='Select Gender'
                  name='gender'
                  required={true}
                  options={['Male', 'Female', 'Other', 'Prefer not to say']}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('gender', 'Gender')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Nationality'
                  placeholder='Select Nationality'
                  name='nationality'
                  required={true}
                  icon={FiGlobe}
                  options={[
                     'Indian',
                     'Non-Resident Indian (NRI)',
                     'Nepalese',
                     'Bhutanese',
                     'Bangladeshi',
                     'Other International',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('nationality', 'Nationality')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Aadhaar Card Number'
                  placeholder='12-digit Aadhaar number'
                  name='AadharCardNumber'
                  type='text'
                  inputMode='numeric'
                  maxLength={16}
                  required={true}
                  icon={FiCreditCard}
                  helperText='For student identity verification'
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('AadharCardNumber', 'Aadhar Card Number')
                        ? 'input-error'
                        : ''
                  }
               />
            </div>
         </div>

         {/* Section 2: Contact Details */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  2
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Contact & Communication Channels
                  </h3>
                  <p className='text-xs text-slate-500'>
                     All admission notices, merit lists, and enrollment credentials will be delivered here
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
               <InputField
                  label='Primary Email Address'
                  placeholder='name@example.com'
                  name='email'
                  type='email'
                  required={true}
                  icon={FiMail}
                  helperText='Will be used for portal login'
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('email', 'Email')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Mobile Contact Number'
                  placeholder='10-digit mobile number'
                  name='contactNumber'
                  type='tel'
                  inputMode='tel'
                  maxLength={15}
                  required={true}
                  icon={FiPhone}
                  helperText='Active WhatsApp or SMS number'
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('contactNumber', 'Contact Number')
                        ? 'input-error'
                        : ''
                  }
               />
            </div>
         </div>

         {/* Section 3: Permanent Address */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  3
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Permanent Residential Address
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Enter your complete residential postal address for official communications
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
               <div className='sm:col-span-2'>
                  <InputField
                     label='Street / Locality / Landmark'
                     placeholder='House No., Building, Street Name, Landmark'
                     name='street'
                     type='text'
                     required={true}
                     icon={FiMapPin}
                     onChange={handleInputChange}
                     className={
                        isRequiredFieldMissing('street', 'Street')
                           ? 'input-error'
                           : ''
                     }
                  />
               </div>

               <InputField
                  label='City / Town / District'
                  placeholder='e.g. Dhanbad'
                  name='city'
                  type='text'
                  required={true}
                  icon={FiMapPin}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('city', 'City')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='State / UT'
                  placeholder='e.g. Jharkhand'
                  name='state'
                  type='text'
                  required={true}
                  icon={FiMapPin}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('state', 'State')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Postal PIN Code'
                  placeholder='e.g. 826001'
                  name='pinCode'
                  type='text'
                  inputMode='numeric'
                  maxLength={10}
                  required={true}
                  icon={FiMapPin}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('pinCode', 'Pin Code')
                        ? 'input-error'
                        : ''
                  }
               />
            </div>
         </div>
      </div>
   );
};

YourInfo.propTypes = {
   formData: PropTypes.object,
   handleInputChange: PropTypes.func.isRequired,
   errors: PropTypes.array,
   showErrors: PropTypes.bool,
};

export default React.memo(YourInfo);
