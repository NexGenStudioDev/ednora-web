import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { IoClose } from 'react-icons/io5';

import PropTypes from 'prop-types';

const NoticeCard = ({
   title,
   link = '#',
   buttonText = 'Explore Now',
}) => {
   const box_ref = useRef();

   useGSAP(() => {
      gsap.to(box_ref.current, {
         y: -45,
         opacity: 1,
         duration: 1,
      });
   });

   const Handle_Close_Btn = e => {
      e.stopPropagation();
      gsap.to(box_ref.current, {
         opacity: 0,
         duration: 0.5,
         display: 'none',
      });
   };

   const isExternal = link?.startsWith('http');

   return (
      <div
         ref={box_ref}
         className='notice-card w-10/12 sm:w-10/12 lg:w-[37vw] 2xl:w-[25vw] md:h-fit md:py-2 text-black bg-white rounded-md px-3 py-2 flex items-center justify-between shadow-lg opacity-0'
      >
         <h3 className='w-1/2 text-[1.2vh] sm:text-sm md:text-base font-medium text-gray-800 line-clamp-2'>
            {title}
         </h3>
         {isExternal ? (
            <a
               href={link}
               target='_blank'
               rel='noopener noreferrer'
               className='bg-[#FF0000] hover:bg-red-700 transition px-3 py-1.5 rounded text-white text-xs sm:text-sm font-medium flex items-center justify-center shrink-0'
            >
               {buttonText}
            </a>
         ) : (
            <a
               href={link}
               className='bg-[#FF0000] hover:bg-red-700 transition px-3 py-1.5 rounded text-white text-xs sm:text-sm font-medium flex items-center justify-center shrink-0'
            >
               {buttonText}
            </a>
         )}
         <IoClose
            fontWeight={900}
            size={20}
            onClick={Handle_Close_Btn}
            className='cursor-pointer text-gray-500 hover:text-gray-800 ml-2 shrink-0'
            title='Dismiss'
         />
      </div>
   );
};

NoticeCard.propTypes = {
   title: PropTypes.string.isRequired,
   link: PropTypes.string,
   buttonText: PropTypes.string,
};

export default NoticeCard;
