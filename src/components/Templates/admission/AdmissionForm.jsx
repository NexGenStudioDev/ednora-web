import React from 'react';
import Steps from './Steps.jsx';
import { FiFileText, FiHeadphones } from 'react-icons/fi';

const AdmissionForm = () => {
   return (
      <div className='w-full'>
         {/* Main Form Container Card */}
         <div className='bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12'>
            {/* Header */}
            <div className='border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
               <div>
                  <div className='inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1'>
                     <FiFileText />
                     <span>Academic Session 2026–2027</span>
                  </div>
                  <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
                     Online Admission Application
                  </h1>
                  <p className='text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl'>
                     Please fill in all required personal, guardian, and academic details carefully.
                  </p>
               </div>

               <div className='shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600'>
                  <div className='w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0'>
                     <FiHeadphones size={16} />
                  </div>
                  <div>
                     <span className='font-semibold text-slate-800 block'>Helpdesk</span>
                     <span className='text-blue-600 font-bold'>+91 96613 42993</span>
                  </div>
               </div>
            </div>

            {/* Stepper Form Flow */}
            <Steps />
         </div>
      </div>
   );
};

export default AdmissionForm;
