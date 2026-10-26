import React from 'react';

const StepValidateModal = ({
   isOpen,
   onClose,
   title,
   message,
   missingFields,
}) => {
   if (!isOpen) return null;

   return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
         <div className='fixed inset-0 bg-black opacity-50'></div>
         <div className='bg-white rounded-2xl shadow-lg w-[90%] max-w-md mx-auto p-6 relative z-10'>
            <h2 className='text-2xl font-semibold text-gray-800'>
               {title}
            </h2>
            <p className='mt-4 text-gray-600'>{message}</p>
            {missingFields?.length > 0 && (
               <ul className='mt-3 list-disc pl-6 text-red-500'>
                  {missingFields.map(field => (
                     <li key={field}>{field}</li>
                  ))}
               </ul>
            )}
            <button
               type='button'
               onClick={onClose}
               className='mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition'
            >
               Close
            </button>
         </div>
      </div>
   );
};

export default StepValidateModal;
