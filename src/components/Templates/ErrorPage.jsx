import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
   return (
      <div className='flex flex-col items-center justify-center h-screen bg-[#333] text-white'>
         <h1 className='text-8xl font-extrabold animate-bounce text-[#FF6603]'>
            404
         </h1>
         <h2 className='mt-4 text-4xl font-semibold'>
            Oops! Page Not Found
         </h2>
         <p className='mt-2 text-lg'>
            It seems the page you&apos;re looking for doesn&apos;t
            exist.
         </p>
         <p className='mt-2 text-md'>
            But don&apos;t worry, you can navigate back!
         </p>
         <Link
            to='/'
            className='mt-6 px-6 py-3 bg-[#FF6603] text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105'
         >
            Go Back Home
         </Link>
      </div>
   );
};

export default ErrorPage;
