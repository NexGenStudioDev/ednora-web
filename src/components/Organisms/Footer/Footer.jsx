import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../../config/frontend.config.js';
import useSocialLinks from '../../../hooks/useSocialLinks';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { MdLaptopMac } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const SocialLink = React.memo(
   ({ href = '', label, isEmail = false }) => {
      if (!href) return null;

      return (
         <a
            href={isEmail ? `mailto:${href}` : href}
            target='_blank'
            rel='noopener noreferrer'
         >
            {label}
         </a>
      );
   },
);

SocialLink.propTypes = {
   href: PropTypes.string,
   label: PropTypes.string.isRequired,
   isEmail: PropTypes.bool,
};

const Footer = React.memo(() => {
   useSocialLinks();
   const socialLinks = useSelector(state => state.socialLink.links);

   return (
      <footer className='relative w-full flex items-center justify-between px-4 md:p-10 max-[999px]:flex-col flex-wrap'>
         <div className='left w-[50%] max-[599px]:pb-10 max-[999px]:w-full flex items-start max-[999px]:items-center justify-center flex-col gap-4'>
            <Link to='/'>
               <img
                  src={logo || EDNORA_LOGO_URL}
                  alt='Ednora Logo'
                  className='h-10 sm:h-12 w-auto object-contain'
               />
            </Link>
            <p className='w-[47%] text-sm lg:text-base max-[599px]:hidden text-gray-600 max-[999px]:text-center max-[999px]:pb-6 leading-relaxed'>
               Helping learners build knowledge, develop practical skills, and explore new possibilities through education, technology, and innovation.
            </p>
         </div>

         <div className='right w-full flex items-start justify-center gap-10 flex-wrap'>
            <div className='flex max-[599px]:w-[25%] items-start justify-evenly flex-col gap-4 mb-4 mx-8'>
               <p className='text-base text-[#333] font-bold'>
                  Navigation
               </p>
               <Link to='/'>Home</Link>
               <Link to='/about'>About Us</Link>
               <Link to='/gallery'>Gallery</Link>
               <Link to='/admission'>Admissions</Link>
               <Link to='/contact'>Contact Us</Link>
            </div>

            <div className='flex max-[599px]:w-[45%] mx-0 items-start justify-between flex-col gap-4 mb-4'>
               <p className='text-base text-[#333] font-bold'>
                  Quick Links
               </p>
               <Link to='/admission'>Online Admission</Link>
               <Link to='/status'>Check Status</Link>
               <Link to='/testimonial'>Testimonials</Link>
               <Link to='/contact'>Contact Us</Link>
               <a
                  href='https://ednora.sourceforge.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition'
               >
                  <MdLaptopMac size={16} />
                  <span>Download Desktop App</span>
               </a>
            </div>

            <div className='flex max-[599px]:w-full items-start max-[599px]:items-center justify-between flex-col gap-4 mb-4 mx-8'>
               <p className='text-base text-[#333] font-bold'>
                  Social Media
               </p>
               <div className='links flex flex-col  max-[599px]:flex-row gap-4 flex-wrap items-start justify-center text-center'>
                  <SocialLink
                     href={socialLinks?.instagram}
                     label='Instagram'
                  />
                  <SocialLink
                     href={socialLinks?.facebook}
                     label='Facebook'
                  />
                  <SocialLink
                     href={socialLinks?.twitter}
                     label='Twitter'
                  />
                  <SocialLink
                     href={socialLinks?.youtube}
                     label='Youtube'
                  />
                  <SocialLink
                     href={socialLinks?.linkedin}
                     label='LinkedIn'
                  />
                  <SocialLink
                     href={socialLinks?.email}
                     label='Email'
                     isEmail
                  />
               </div>
            </div>
         </div>

         {/* Footer Bottom Bar */}
         <div className='w-full mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs'>
            {/* Left: Branding & Copyright */}
            <div className='flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left text-gray-500'>
               <p className='font-medium text-gray-700'>
                  © {new Date().getFullYear()} Ednora
               </p>
               <span className='hidden sm:inline text-gray-300'>
                  •
               </span>
               <p className='text-gray-500'>
                  Learn with purpose. Build with confidence. Grow for the future.
               </p>
            </div>

            {/* Right: GitHub Logo & Managed By Link */}
            <a
               href='https://github.com/NexGenStudioDev/ednora-web'
               target='_blank'
               rel='noopener noreferrer'
               className='group flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-700 hover:text-black transition-all shadow-xs'
               title='Visit GitHub repository'
            >
               <FaGithub
                  size={18}
                  className='text-gray-900 group-hover:scale-110 transition-transform'
               />
               <span className='font-medium text-xs text-gray-700'>
                  Managed by{' '}
                  <span className='font-semibold text-blue-600 group-hover:text-blue-700'>
                     Abhishek nexgen
                  </span>
               </span>
            </a>
         </div>
      </footer>
   );
});

export default Footer;
