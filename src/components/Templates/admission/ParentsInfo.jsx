import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Dropdown from './DropDown';
import { FiUser, FiPhone, FiBriefcase, FiShield, FiInfo } from 'react-icons/fi';

const ParentsInfo = ({
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
      <div className='flex flex-col gap-6'>
         <div className='p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3'>
            <FiInfo size={20} className='text-blue-600 shrink-0 mt-0.5' />
            <div className='text-xs sm:text-sm text-slate-700 leading-relaxed'>
               <span className='font-bold text-blue-900'>Guardian Contact Protocol: </span>
               In case of academic updates, emergency notifications, or fee
               receipt acknowledgments, CIITM communicates directly with the designated
               primary guardian specified below.
            </div>
         </div>

         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  <FiShield size={14} />
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Primary Guardian / Sponsor Details
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Parent or authorized legal guardian responsible for academic affairs
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
               <InputField
                  label="Guardian's Full Name"
                  placeholder='e.g. Suresh Kumar Sharma'
                  name='Gname'
                  type='text'
                  required={true}
                  icon={FiUser}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('Gname', "Guardian's Name")
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Relationship with Applicant'
                  placeholder='Select Relationship'
                  name='Grelation'
                  required={true}
                  icon={FiShield}
                  options={[
                     'Father',
                     'Mother',
                     'Elder Brother',
                     'Elder Sister',
                     'Uncle / Aunt',
                     'Legal Guardian',
                     'Other Sponsor',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('Grelation', "Guardian's Relation")
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label="Guardian's Mobile Number"
                  placeholder='10-digit contact number'
                  name='GcontactNumber'
                  type='tel'
                  inputMode='tel'
                  maxLength={15}
                  required={true}
                  icon={FiPhone}
                  helperText='For emergency & fee updates'
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('GcontactNumber', "Guardian's Contact Number")
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label="Guardian's Profession / Occupation"
                  placeholder='e.g. Government Service / Business / Teacher'
                  name='Goccupation'
                  type='text'
                  required={false}
                  icon={FiBriefcase}
                  helperText='Optional'
                  onChange={handleInputChange}
               />

               <InputField
                  label='Annual Family Income Bracket'
                  placeholder='e.g. ₹3 Lakhs – ₹6 Lakhs'
                  name='familyIncome'
                  type='text'
                  required={false}
                  helperText='Used for scholarship eligibility'
                  onChange={handleInputChange}
               />
            </div>
         </div>
      </div>
   );
};

ParentsInfo.propTypes = {
   formData: PropTypes.object,
   handleInputChange: PropTypes.func.isRequired,
   errors: PropTypes.array,
   showErrors: PropTypes.bool,
};

export default React.memo(ParentsInfo);
