import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import arrow from '../../../assets/images/arrow.png';
import H2 from '../../Atoms/Heading/H2';
import H4 from '../../Atoms/Heading/H4';
import P4 from '../../Atoms/Paragraph/P4';
import frontendConfig from '../../../config/frontend.config.js';

const Empower = () => {
   const defaultAbout = frontendConfig.landingPage.AboutSection;
   const [images, setImages] = useState({
      image1: defaultAbout.image_First,
      image2: defaultAbout.image_Second,
      image3: defaultAbout.image_Third,
   });
   const [textContent, setTextContent] = useState({
      headingFirst: defaultAbout.Heading_First,
      headingSecond: defaultAbout.Heading_Second,
      paragraphFirst: defaultAbout.paragraph_First,
      paragraphSecond: defaultAbout.paragraph_Second,
   });

   const about = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (about?.AboutSection) {
         const {
            image_First,
            image_Second,
            image_Third,
            Heading_First,
            Heading_Second,
            paragraph_First,
            paragraph_Second,
         } = about.AboutSection;

         setImages({
            image1: image_First || defaultAbout.image_First,
            image2: image_Second || defaultAbout.image_Second,
            image3: image_Third || defaultAbout.image_Third,
         });

         setTextContent({
            headingFirst: Heading_First || defaultAbout.Heading_First,
            headingSecond: Heading_Second || defaultAbout.Heading_Second,
            paragraphFirst: paragraph_First || defaultAbout.paragraph_First,
            paragraphSecond: paragraph_Second || defaultAbout.paragraph_Second,
         });
      }
   }, [about, defaultAbout]);

   const { image1, image2, image3 } = images;
   const {
      headingFirst,
      headingSecond,
      paragraphFirst,
      paragraphSecond,
   } = textContent;

   return (
      <div className='flex my-10 max-[599px]:my-0 relative'>
         <img
            src={arrow}
            alt='Arrow indicating direction'
            className='arrow-image absolute top-1/2 left-[39vw] -translate-x-1/2 -translate-y-1/2 h-[13vw]'
         />

         <div className='empower-img-div relative w-1/2 h-full md:flex justify-center items-center'>
            <div className='max-h-[17vw] max-w-[17vw] bg-black rounded-full absolute left-[3vw] top-[1vw]'>
               {image1 && (
                  <img
                     src={image1}
                     alt='Empower image 1'
                     className='h-full w-full object-cover rounded-full'
                  />
               )}
            </div>

            <div className='h-[10vh] w-[10vh] md:h-[12vw] md:w-[12vw] rounded-full absolute left-[22vw] top-[19vh]'>
               {image2 && (
                  <img
                     src={image2}
                     alt='Empower image 2'
                     className='h-full w-full object-cover rounded-full'
                  />
               )}
            </div>

            <div className='h-[16vw] w-[16vw] rounded-full absolute left-[8vw] top-[30vh] md:top-[40vh] bg-red-600  '>
               {image3 && (
                  <img
                     src={image3}
                     alt='Empower image 3'
                     className='h-full w-full object-cover rounded-full'
                  />
               )}
            </div>
         </div>

         <div className='empower-text md:w-1/2 relative'>
            <H2 className="text-[3vw] max-[599px]:text-[6vw] max-[1440px]:text-[3vw] font-['Montserrat'] font-bold my-2 max-[599px]:my-2  w-[37vw] max-[599px]:w-full text-[#333333]">
               {headingFirst}
            </H2>

            <H4 Tailwind_utility_Class="text-[1.6vw] max-[599px]:text-[4vw] font-['Montserrat'] font-medium max-[599px]:font-bold my-2 max-[599px]:my-2 max-[599px]:leading-tight w-[37vw] max-[599px]:w-full text-[#333333]">
               {headingSecond}
            </H4>

            <P4 Tailwind_utility_Class="text-[0.9vw] max-[599px]:mt-4 max-[599px]:text-[3vw] mt-4 font-medium w-[35vw] max-[599px]:w-full text-[#333333] font-['Poppins']">
               {paragraphFirst}
               <br />
               <br />
               {paragraphSecond}
            </P4>
            <button className='my-[2vh] bg-[#333] font-["Poppins"] text-white py-2 px-4 rounded-lg'>
               Read More
            </button>
         </div>
      </div>
   );
};

export default memo(Empower);
