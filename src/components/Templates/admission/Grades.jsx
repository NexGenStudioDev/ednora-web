import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Dropdown from './DropDown';
import { FiAward, FiBookOpen, FiCheckSquare } from 'react-icons/fi';

const Grades = ({
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
         {/* Academic Requirement Guide */}
         <div className='p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3'>
            <FiCheckSquare size={20} className='text-indigo-600 shrink-0 mt-0.5' />
            <div className='text-xs sm:text-sm text-slate-700 leading-relaxed'>
               <span className='font-bold text-indigo-950'>
                  Eligibility Requirement:{' '}
               </span>
               Applicants for Bachelor of Computer Applications (BCA) or Bachelor of
               Business Administration (BBA) must have successfully completed 10+2 /
               Higher Secondary Examination from a recognized central or state board
               with a minimum aggregate score of 45% (40% for reserved categories).
            </div>
         </div>

         {/* 10th Standard / Matriculation Card */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  <FiAward size={14} />
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Class 10th (Matriculation / Secondary School Examination)
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Enter your secondary examination academic performance
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
               <Dropdown
                  label='Examination Board (10th)'
                  placeholder='Select Board'
                  name='tenthBoard'
                  required={true}
                  options={[
                     'CBSE (Central Board of Secondary Education)',
                     'JAC (Jharkhand Academic Council)',
                     'ICSE (Council for the Indian School Certificate)',
                     'BSEB (Bihar School Examination Board)',
                     'West Bengal State Board (WBBSE)',
                     'Other Recognized State Board',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('tenthBoard', 'Tenth Board')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Total Marks / Percentage (% or CGPA)'
                  placeholder='e.g. 82.5% or 8.6 CGPA'
                  name='tenthMarks'
                  type='text'
                  required={true}
                  icon={FiBookOpen}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('tenthMarks', 'Tenth Marks')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Overall Grade / Division'
                  placeholder='Select Grade'
                  name='tenthGrade'
                  required={true}
                  options={[
                     'A+ (90% and above)',
                     'A (75% to 89%)',
                     'B (60% to 74% - 1st Div)',
                     'C (45% to 59% - 2nd Div)',
                     'Pass Division',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('tenthGrade', 'Tenth Grade')
                        ? 'input-error'
                        : ''
                  }
               />

               <InputField
                  label='Year of Passing'
                  placeholder='e.g. 2024'
                  name='tenthYear'
                  type='number'
                  required={false}
                  helperText='Optional'
                  onChange={handleInputChange}
               />
            </div>
         </div>

         {/* 12th Standard / Intermediate Card */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  <FiAward size={14} />
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Class 12th (Intermediate / Senior Secondary School Examination)
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Enter your higher secondary examination details or state if awaiting final results
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
               <Dropdown
                  label='Examination Board (12th)'
                  placeholder='Select Board'
                  name='twelfthBoard'
                  required={true}
                  options={[
                     'CBSE (Central Board of Secondary Education)',
                     'JAC (Jharkhand Academic Council)',
                     'ISC (Council for the Indian School Certificate)',
                     'BSEB (Bihar School Examination Board)',
                     'West Bengal State Board (WBCHSE)',
                     'Other Recognized State Board',
                     'Result Awaited / Appearing 2026',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('twelfthBoard', 'Twelfth Board')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Stream / Discipline'
                  placeholder='Select Stream'
                  name='twelfthStream'
                  required={false}
                  options={[
                     'Science (PCM - Physics, Chemistry, Maths)',
                     'Science (PCB - Physics, Chemistry, Biology)',
                     'Commerce with Mathematics',
                     'Commerce with Informatics Practices',
                     'Arts / Humanities with Computer Applications',
                     'Vocational / Information Technology',
                  ]}
                  onChange={handleInputChange}
               />

               <InputField
                  label='Total Marks / Percentage (% or CGPA)'
                  placeholder='e.g. 78.4% or Appearing'
                  name='twelfthMarks'
                  type='text'
                  required={true}
                  icon={FiBookOpen}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('twelfthMarks', 'Twelfth Marks')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Overall Grade / Division'
                  placeholder='Select Grade'
                  name='twelfthGrade'
                  required={true}
                  options={[
                     'A+ (90% and above)',
                     'A (75% to 89%)',
                     'B (60% to 74% - 1st Div)',
                     'C (45% to 59% - 2nd Div)',
                     'Result Awaited / Appearing',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('twelfthGrade', 'Twelfth Grade')
                        ? 'input-error'
                        : ''
                  }
               />
            </div>
         </div>
      </div>
   );
};

Grades.propTypes = {
   formData: PropTypes.object,
   handleInputChange: PropTypes.func.isRequired,
   errors: PropTypes.array,
   showErrors: PropTypes.bool,
};

export default React.memo(Grades);
