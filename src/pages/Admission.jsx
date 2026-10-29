import React from 'react';
import AdmissionForm from '../components/Templates/admission/AdmissionForm';

const Admission = () => {
   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
         <title>Online Admission 2026–2027 — CIITM Dhanbad</title>
         <meta
            name='description'
            content='Online admission application form for academic session 2026-2027 at CIITM Dhanbad.'
         />

         <div className='max-w-5xl mx-auto'>
            <AdmissionForm />
         </div>
      </div>
   );
};

export default Admission;
