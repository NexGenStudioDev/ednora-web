import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuickLink = ({ path, text }) => {
   const isExternal = path?.startsWith('http');

   if (isExternal) {
      return (
         <a
            href={path}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[2vw] max-[640px]:text-[2vw] max-[640px]:p-[0.5vw] max-[992px]:text-[2.5vw] max-[640px]:w-[30vw] max-[992px]:w-[22vw] md:text-[1vw] text-gray-400 hover:text-white inline p-[0.6vw] md:w-[12vw] border border-gray-600 rounded-xl text-center transition hover:border-blue-500'
         >
            {text}
         </a>
      );
   }

   return (
      <Link
         to={path}
         className='text-[2vw] max-[640px]:text-[2vw] max-[640px]:p-[0.5vw] max-[992px]:text-[2.5vw] max-[640px]:w-[30vw] max-[992px]:w-[22vw]  md:text-[1vw] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white inline  p-[0.6vw] md:w-[10vw]  border border-1 rounded-xl text-center'
      >
         {text}
      </Link>
   );
};

QuickLink.propTypes = {
   path: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
};

export default QuickLink;
