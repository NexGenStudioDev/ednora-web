import React from 'react';
import Steps from './Steps.jsx';

const AdmissionForm = () => {
   return (
      <div className='px-4 sm:px-8 lg:px-12 text-[#333333] bg-slate-50 pb-16 pt-8'>
         <div className='max-w-6xl mx-auto'>
            <div className='bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 mb-6 text-sm sm:text-base text-gray-700 leading-relaxed'>
               <span className='font-bold text-blue-900'>Note: </span>
               Welcome to CIITM Dhanbad, an institution dedicated to
               fostering innovation, knowledge, and personal growth.
               Our mission is to empower students with technical
               excellence, modern industry skills, and holistic career
               opportunities.
            </div>

            <div className='bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10'>
               <div className='border-b border-gray-200 pb-4 mb-6 flex flex-wrap items-center justify-between gap-2'>
                  <div>
                     <h1 className='font-extrabold text-2xl text-gray-900'>
                        Online Admission Application (2026-2027)
                     </h1>
                     <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                        Please fill in all required academic,
                        personal, and guardian details carefully
                        before submitting your application.
                     </p>
                  </div>
               </div>

               <div>
                  <Steps />
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdmissionForm;
