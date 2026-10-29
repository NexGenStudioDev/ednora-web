import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './DropDown';
import socket from '../../../config/socket.mjs';
import {
   FiCamera,
   FiUploadCloud,
   FiTrash2,
   FiCheckCircle,
   FiBookOpen,
   FiAward,
   FiClock,
} from 'react-icons/fi';

const UniversityInfo = ({
   formData = {},
   handleInputChange,
   errors = [],
   showErrors = false,
   image,
   handleImageUpload,
   onRemoveImage,
}) => {
   const [courseList, setCourseList] = useState([
      'Bachelor of Computer Applications (BCA)',
      'Bachelor of Business Administration (BBA)',
      'Full Stack Web Development Certification (1 Year)',
      'Post Graduate Diploma in Computer Applications (PGDCA)',
      'Diploma in Information Technology & Cloud',
   ]);

   // Course metadata previews for interactive feedback
   const courseDetails = {
      'Bachelor of Computer Applications (BCA)': {
         duration: '3 Years (6 Semesters)',
         eligibility: '10+2 with Mathematics/CS preferred (min 45%)',
         highlights: 'Software Engineering, Full Stack, Data Structures & AI Labs',
         fee: '₹18,000 / Semester',
      },
      'Bachelor of Business Administration (BBA)': {
         duration: '3 Years (6 Semesters)',
         eligibility: '10+2 in any stream (min 45%)',
         highlights: 'Corporate Management, Digital Marketing, Financial Systems',
         fee: '₹16,500 / Semester',
      },
      'Full Stack Web Development Certification (1 Year)': {
         duration: '1 Year Fast-Track',
         eligibility: '10+2 or Graduation in any discipline',
         highlights: 'React, Node.js, PostgreSQL, Docker, Git & Capstone Deployments',
         fee: '₹22,000 Total Course Fee',
      },
      'Post Graduate Diploma in Computer Applications (PGDCA)': {
         duration: '1 Year (2 Semesters)',
         eligibility: "Bachelor's Degree in any discipline",
         highlights: 'Enterprise Database, Operating Systems, Advanced Scripting',
         fee: '₹15,000 / Semester',
      },
   };

   useEffect(() => {
      let isMounted = true;
      try {
         if (socket && typeof socket.emit === 'function') {
            if (!socket.connected) {
               socket.connect();
            }
            socket.emit('FindCourse');
            socket.once('CourseFound', data => {
               if (isMounted && data && Array.isArray(data) && data.length > 0) {
                  const mapped = data.map(item => item.courseName || item);
                  setCourseList(prev => [...new Set([...mapped, ...prev])]);
               }
            });
         }
      } catch (err) {
         console.warn('Socket course fetch bypassed, using default course roster:', err);
      }

      return () => {
         isMounted = false;
         if (socket && typeof socket.off === 'function') {
            socket.off('CourseFound');
         }
      };
   }, []);

   const isRequiredFieldMissing = (fieldKey, fieldLabel) => {
      if (!showErrors) return false;
      return (
         errors.includes(fieldLabel) ||
         errors.includes(fieldKey) ||
         !formData[fieldKey] ||
         String(formData[fieldKey]).trim() === ''
      );
   };

   const selectedCourse = formData.courseName || '';
   const activeCourseInfo =
      courseDetails[selectedCourse] ||
      courseDetails['Bachelor of Computer Applications (BCA)'];

   return (
      <div className='flex flex-col gap-8'>
         {/* Program Selection Card */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  <FiBookOpen size={14} />
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     University Affiliation & Academic Program
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Choose your affiliated university, intended qualification, and campus study format
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
               <Dropdown
                  label='Affiliated University'
                  placeholder='Select University'
                  name='university'
                  required={true}
                  options={[
                     'Aisect University',
                     'Makhanlal Chaturvedi National University (MCU Bhopal)',
                     'Ednora Institute of Technology (Autonomous)',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('university', 'University')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Degree / Program Choice'
                  placeholder='Select Course'
                  name='courseName'
                  required={true}
                  options={courseList}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('courseName', 'Course Name')
                        ? 'input-error'
                        : ''
                  }
               />

               <Dropdown
                  label='Study Mode'
                  placeholder='Select Study Mode'
                  name='mode'
                  required={true}
                  options={[
                     'Regular On-Campus (Day Scholar)',
                     'Regular On-Campus (With Hostel)',
                     'Blended Hybrid Mode',
                     'Weekend / Working Professional',
                  ]}
                  onChange={handleInputChange}
                  className={
                     isRequiredFieldMissing('mode', 'Mode')
                        ? 'input-error'
                        : ''
                  }
               />
            </div>

            {/* Dynamic Course Overview Badge */}
            {activeCourseInfo && (
               <div className='mt-6 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs'>
                  <div className='flex items-center gap-2 mb-2 text-xs font-bold text-blue-900 uppercase tracking-wider'>
                     <FiAward className='text-blue-600' />
                     <span>Program Overview: {selectedCourse || 'Bachelor of Computer Applications (BCA)'}</span>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600'>
                     <div className='flex items-center gap-2'>
                        <FiClock className='text-slate-400' />
                        <span><strong>Duration:</strong> {activeCourseInfo.duration}</span>
                     </div>
                     <div className='flex items-center gap-2'>
                        <FiCheckCircle className='text-emerald-500' />
                        <span><strong>Eligibility:</strong> {activeCourseInfo.eligibility}</span>
                     </div>
                     <div>
                        <span><strong>Highlights:</strong> {activeCourseInfo.highlights}</span>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Passport Photograph Upload Card */}
         <div className='bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80'>
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-slate-200'>
               <div className='w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs'>
                  <FiCamera size={14} />
               </div>
               <div>
                  <h3 className='text-sm font-bold text-slate-900'>
                     Student Passport Photograph
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Required for Student Identity Card, Admit Cards, and Official University Registration
                  </p>
               </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 items-start'>
               {/* Upload Dropzone */}
               <div className='flex-1 w-full'>
                  <input
                     type='file'
                     accept='image/jpeg,image/png,image/webp'
                     onChange={handleImageUpload}
                     className='hidden'
                     id='student-photo-input'
                  />

                  <label
                     htmlFor='student-photo-input'
                     className='flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl bg-white hover:bg-blue-50/20 cursor-pointer transition-all duration-200 text-center group'
                  >
                     <div className='w-12 h-12 rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform'>
                        <FiUploadCloud size={24} />
                     </div>
                     <p className='text-sm font-semibold text-slate-800 mb-1'>
                        Click to upload passport photo
                     </p>
                     <p className='text-xs text-slate-500 max-w-sm mb-3'>
                        JPG, PNG, or WebP (recommended 400x500px, max 2MB).
                        Must have clear neutral background.
                     </p>
                     <span className='px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition shadow-xs'>
                        Choose Image File
                     </span>
                  </label>

                  {showErrors && !image && (
                     <p className='text-xs text-rose-500 font-medium flex items-center gap-1 mt-2'>
                        <svg className='w-3.5 h-3.5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                           <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                        </svg>
                        <span>Please upload applicant passport photo before proceeding</span>
                     </p>
                  )}
               </div>

               {/* Photo Preview Column */}
               <div className='w-full md:w-56 shrink-0 flex flex-col items-center'>
                  <div className='text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2'>
                     Live Photo Preview
                  </div>

                  <div className='w-36 h-44 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs relative flex items-center justify-center'>
                     {image ? (
                        <>
                           <img
                              src={image}
                              alt='Student Passport'
                              className='w-full h-full object-cover'
                           />
                           <div className='absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1 shadow'>
                              <FiCheckCircle size={14} />
                           </div>
                        </>
                     ) : (
                        <div className='flex flex-col items-center justify-center text-slate-300 p-4 text-center'>
                           <FiCamera size={36} className='mb-2 text-slate-300' />
                           <span className='text-[11px] text-slate-400'>
                              No photo selected yet
                           </span>
                        </div>
                     )}
                  </div>

                  {image && (
                     <div className='flex items-center gap-2 mt-3'>
                        <label
                           htmlFor='student-photo-input'
                           className='text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer underline'
                        >
                           Change
                        </label>
                        <span className='text-slate-300'>·</span>
                        <button
                           type='button'
                           onClick={onRemoveImage}
                           className='text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium'
                        >
                           <FiTrash2 size={12} />
                           <span>Remove</span>
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

UniversityInfo.propTypes = {
   formData: PropTypes.object,
   handleInputChange: PropTypes.func.isRequired,
   errors: PropTypes.array,
   showErrors: PropTypes.bool,
   image: PropTypes.string,
   imageUploadSuccess: PropTypes.bool,
   handleImageUpload: PropTypes.func.isRequired,
   onRemoveImage: PropTypes.func,
};

export default React.memo(UniversityInfo);
