import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
   FiShield,
   FiCheckCircle,
   FiAlertCircle,
   FiUser,
   FiBookOpen,
   FiPhone,
   FiAward,
} from 'react-icons/fi';

const AreyouHuman = ({
   formData = {},
   image = null,
   setIsVerified,
   termsAccepted = false,
   setTermsAccepted,
}) => {
   // Interactive math challenge for anti-bot security
   const [num1, setNum1] = useState(7);
   const [num2, setNum2] = useState(5);
   const [answer, setAnswer] = useState('');
   const [mathVerified, setMathVerified] = useState(false);
   const [mathError, setMathError] = useState(false);

   useEffect(() => {
      // Generate two random single-digit numbers for the verification challenge
      const n1 = Math.floor(Math.random() * 8) + 2;
      const n2 = Math.floor(Math.random() * 8) + 1;
      setNum1(n1);
      setNum2(n2);
   }, []);

   const handleAnswerChange = e => {
      const val = e.target.value.trim();
      setAnswer(val);

      if (parseInt(val, 10) === num1 + num2) {
         setMathVerified(true);
         setMathError(false);
         if (setIsVerified) setIsVerified(true);
      } else {
         setMathVerified(false);
         if (val.length >= String(num1 + num2).length) {
            setMathError(true);
         }
         if (setIsVerified) setIsVerified(false);
      }
   };

   const applicantFullName = [
      formData.firstName,
      formData.middleName,
      formData.lastName,
   ]
      .filter(Boolean)
      .join(' ') || 'Not Specified';

   return (
      <div className='flex flex-col gap-8'>
         {/* Application Review Summary Card */}
         <div className='bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/90'>
            <div className='flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6'>
               <div>
                  <span className='text-xs font-bold text-blue-600 uppercase tracking-wider'>
                     Step 5 · Pre-Submission Audit
                  </span>
                  <h3 className='text-lg font-bold text-slate-900 mt-0.5'>
                     Review Your Application Summary
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Verify all details before final electronic submission. You can go back to previous steps to amend any information.
                  </p>
               </div>

               {image && (
                  <div className='flex items-center gap-3'>
                     <img
                        src={image}
                        alt='Uploaded Student'
                        className='w-14 h-16 rounded-xl object-cover border-2 border-white shadow-sm'
                     />
                     <div className='text-left'>
                        <span className='text-[11px] font-semibold text-emerald-600 flex items-center gap-1'>
                           <FiCheckCircle size={12} />
                           Photo Attached
                        </span>
                        <p className='text-xs font-bold text-slate-800 truncate max-w-[140px]'>
                           {applicantFullName}
                        </p>
                     </div>
                  </div>
               )}
            </div>

            {/* Summary Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs text-slate-700'>
               {/* Box 1: Personal Profile */}
               <div className='p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs'>
                  <div className='flex items-center gap-2 mb-3 font-bold text-slate-900 border-b border-slate-100 pb-2'>
                     <FiUser className='text-blue-600' />
                     <span>Personal Profile</span>
                  </div>
                  <dl className='space-y-1.5'>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Full Name:</dt>
                        <dd className='font-semibold text-slate-800 text-right'>{applicantFullName}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Date of Birth:</dt>
                        <dd className='font-medium text-slate-700'>{formData.dateOfBirth || '—'}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Gender:</dt>
                        <dd className='font-medium text-slate-700'>{formData.gender || '—'}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Aadhaar No:</dt>
                        <dd className='font-medium text-slate-700'>{formData.AadharCardNumber || '—'}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Nationality:</dt>
                        <dd className='font-medium text-slate-700'>{formData.nationality || '—'}</dd>
                     </div>
                  </dl>
               </div>

               {/* Box 2: Program & University */}
               <div className='p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs'>
                  <div className='flex items-center gap-2 mb-3 font-bold text-slate-900 border-b border-slate-100 pb-2'>
                     <FiBookOpen className='text-blue-600' />
                     <span>Applied Program</span>
                  </div>
                  <dl className='space-y-1.5'>
                     <div>
                        <dt className='text-slate-400'>Chosen Course:</dt>
                        <dd className='font-semibold text-blue-900 text-sm mt-0.5'>
                           {formData.courseName || 'Bachelor of Computer Applications (BCA)'}
                        </dd>
                     </div>
                     <div className='flex justify-between pt-1'>
                        <dt className='text-slate-400'>University:</dt>
                        <dd className='font-medium text-slate-700 text-right truncate max-w-[160px]'>
                           {formData.university || 'Aisect University'}
                        </dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Study Mode:</dt>
                        <dd className='font-medium text-slate-700'>{formData.mode || 'Regular On-Campus'}</dd>
                     </div>
                  </dl>
               </div>

               {/* Box 3: Contact & Guardian */}
               <div className='p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs'>
                  <div className='flex items-center gap-2 mb-3 font-bold text-slate-900 border-b border-slate-100 pb-2'>
                     <FiPhone className='text-blue-600' />
                     <span>Contact & Guardian</span>
                  </div>
                  <dl className='space-y-1.5'>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Applicant Email:</dt>
                        <dd className='font-medium text-slate-800 truncate max-w-[160px]'>{formData.email || '—'}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Mobile Phone:</dt>
                        <dd className='font-medium text-slate-800'>{formData.contactNumber || '—'}</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>Guardian:</dt>
                        <dd className='font-medium text-slate-800'>{formData.Gname || '—'} ({formData.Grelation || 'Parent'})</dd>
                     </div>
                     <div className='flex justify-between'>
                        <dt className='text-slate-400'>City & State:</dt>
                        <dd className='font-medium text-slate-800'>{formData.city ? `${formData.city}, ${formData.state || ''}` : '—'}</dd>
                     </div>
                  </dl>
               </div>
            </div>

            {/* Academic Snapshot Strip */}
            <div className='mt-4 p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/70 flex flex-wrap items-center justify-between gap-4 text-xs'>
               <div className='flex items-center gap-2 text-slate-800'>
                  <FiAward className='text-blue-600 shrink-0' />
                  <span>
                     <strong>10th Standard:</strong> {formData.tenthBoard || 'CBSE'} · {formData.tenthMarks || 'N/A'} ({formData.tenthGrade || 'Grade A'})
                  </span>
               </div>
               <div className='flex items-center gap-2 text-slate-800'>
                  <FiAward className='text-blue-600 shrink-0' />
                  <span>
                     <strong>12th Standard:</strong> {formData.twelfthBoard || 'CBSE'} · {formData.twelfthMarks || 'N/A'} ({formData.twelfthGrade || 'Grade A'})
                  </span>
               </div>
            </div>
         </div>

         {/* Human Verification & Legal Declaration Card */}
         <div className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <div className='flex items-center gap-3 mb-5 pb-3 border-b border-slate-100'>
               <div className='w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold'>
                  <FiShield size={20} />
               </div>
               <div>
                  <h3 className='text-base font-bold text-slate-900'>
                     Human Verification & Legal Declaration
                  </h3>
                  <p className='text-xs text-slate-500'>
                     Confirm your genuine human identity and accept the university application code of conduct
                  </p>
               </div>
            </div>

            {/* Math Security Challenge */}
            <div className='p-5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6'>
               <label className='block text-xs font-semibold text-slate-700 mb-2'>
                  Security Anti-Bot Question:
               </label>
               <div className='flex flex-wrap items-center gap-3'>
                  <span className='px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-mono text-sm font-bold text-slate-800 shadow-2xs'>
                     What is {num1} + {num2} = ?
                  </span>

                  <input
                     type='number'
                     placeholder='Enter sum'
                     value={answer}
                     onChange={handleAnswerChange}
                     className={`w-32 px-4 py-2.5 rounded-xl border bg-white text-sm font-semibold outline-none transition ${
                        mathVerified
                           ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/30 text-emerald-800'
                           : mathError
                             ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/30'
                             : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                     }`}
                  />

                  {mathVerified ? (
                     <div className='inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in'>
                        <FiCheckCircle size={16} />
                        <span>Security verified successfully</span>
                     </div>
                  ) : mathError ? (
                     <div className='inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 animate-in fade-in'>
                        <FiAlertCircle size={16} />
                        <span>Incorrect answer. Try again.</span>
                     </div>
                  ) : (
                     <span className='text-xs text-slate-400'>
                        Type the sum to verify human applicant
                     </span>
                  )}
               </div>
            </div>

            {/* Declaration Checkboxes */}
            <div className='space-y-4'>
               <label className='flex items-start gap-3 cursor-pointer group'>
                  <input
                     type='checkbox'
                     checked={termsAccepted}
                     onChange={e =>
                        setTermsAccepted && setTermsAccepted(e.target.checked)
                     }
                     className='w-4 h-4 mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer shrink-0'
                  />
                  <div className='text-xs sm:text-sm text-slate-700 leading-relaxed select-none'>
                     <span className='font-semibold text-slate-900'>
                        Applicant Declaration & Code of Conduct:
                     </span>{' '}
                     I hereby certify that all information submitted in this application
                     is authentic and accurate. I understand that any false declaration or
                     unverified document will lead to immediate cancellation of admission
                     as per university regulations.
                  </div>
               </label>
            </div>
         </div>
      </div>
   );
};

AreyouHuman.propTypes = {
   formData: PropTypes.object,
   image: PropTypes.string,
   isVerified: PropTypes.bool,
   setIsVerified: PropTypes.func,
   termsAccepted: PropTypes.bool,
   setTermsAccepted: PropTypes.func,
};

export default React.memo(AreyouHuman);
