import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu, IoClose, IoChevronDown } from 'react-icons/io5';
import { MdLaptopMac, MdOpenInNew } from 'react-icons/md';
import gsap from 'gsap';
import logo from '../../../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../../../config/frontend.config.js';
import { useSelector } from 'react-redux';

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const user = useSelector(state => state.auth.user);

   const toggleDropdown = useCallback(() => {
      setIsDropdownOpen(prev => !prev);
   }, []);

   const handleResize = useCallback(() => {
      if (window.innerWidth > 799) {
         setIsMenuOpen(false);
      }
   }, []);

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, [handleResize]);

   useEffect(() => {
      gsap.to('.mobile-menu', {
         y: isMenuOpen ? '0%' : '-100%',
         duration: 0.5,
      });
   }, [isMenuOpen]);

   useEffect(() => {
      const handleClickOutside = event => {
         if (!event.target.closest('.dropdown-container')) {
            setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener(
            'mousedown',
            handleClickOutside,
         );
   }, []);

   const navLinks = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/gallery', label: 'Gallery' },
      { to: '#students', label: 'Admissions', dropdown: true },
      { to: '/contact', label: 'Contact Us' },
   ];

   return (
      <>
         {/* Mobile Menu */}
         <div className='mobile-menu fixed top-0 left-0 z-50 w-full h-screen bg-[#333] text-white flex items-center justify-center flex-col gap-10 translate-y-[-100%] md:hidden'>
            {navLinks.map(link =>
               !link.dropdown ? (
                  <NavLink
                     key={link.to}
                     to={link.to}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     {link.label}
                  </NavLink>
               ) : (
                  <div
                     key={link.to}
                     className='relative dropdown-container'
                  >
                     <button
                        className='flex items-center gap-1'
                        onClick={toggleDropdown}
                     >
                        {link.label}
                        <IoChevronDown
                           size={16}
                           className={
                              isDropdownOpen ? 'rotate-180' : ''
                           }
                        />
                     </button>
                     {isDropdownOpen && (
                        <div className='absolute bg-white text-black shadow rounded w-40'>
                           <NavLink
                              to='/admission'
                              onClick={() => setIsMenuOpen(false)}
                              className='block px-4 py-2 hover:bg-gray-100 transition'
                           >
                              Admission
                           </NavLink>
                           <NavLink
                              to='/status'
                              onClick={() => setIsMenuOpen(false)}
                              className='block px-4 py-2 hover:bg-gray-100 transition'
                           >
                              Check Status
                           </NavLink>
                           <NavLink
                              to='/testimonial'
                              onClick={() => setIsMenuOpen(false)}
                              className='block px-4 py-2 hover:bg-gray-100 transition'
                           >
                              Testimonial
                           </NavLink>
                        </div>
                     )}
                  </div>
               ),
            )}

            {/* Desktop App Download Button for Mobile */}
            <div className='flex flex-col gap-4 w-full px-8'>
               <a
                  href='https://ednora.sourceforge.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsMenuOpen(false)}
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-center font-medium shadow-md transition'
               >
                  <MdLaptopMac size={20} />
                  <span>Download Desktop App</span>
                  <MdOpenInNew size={16} className='opacity-80' />
               </a>
            </div>
         </div>

         {/* Main Navbar */}
         <nav className='fixed top-0 left-0 w-full px-10 py-3 bg-white flex justify-between items-center z-50 shadow-md'>
            <NavLink to='/'>
               <img
                  src={logo || EDNORA_LOGO_URL}
                  alt='Ednora Logo'
                  className='h-10 sm:h-12 w-auto object-contain'
               />
            </NavLink>

            <div className='hidden md:flex gap-6'>
               {navLinks.map(link =>
                  !link.dropdown ? (
                     <NavLink
                        key={link.to}
                        to={link.to}
                        className='hover:text-blue-600 transition font-medium text-gray-700'
                     >
                        {link.label}
                     </NavLink>
                  ) : (
                     <div
                        key={link.to}
                        className='relative dropdown-container'
                     >
                        <button
                           className='flex items-center gap-1 hover:text-blue-600 transition font-medium text-gray-700'
                           onClick={toggleDropdown}
                        >
                           {link.label}
                           <IoChevronDown
                              size={16}
                              className={
                                 isDropdownOpen ? 'rotate-180' : ''
                              }
                           />
                        </button>
                        {isDropdownOpen && (
                           <div className='absolute bg-white text-black shadow-lg rounded-lg w-44 py-1.5 border border-gray-100 z-50'>
                              <NavLink
                                 to='/admission'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Admission
                              </NavLink>
                              <NavLink
                                 to='/status'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Check Status
                              </NavLink>
                              <NavLink
                                 to='/testimonial'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Testimonial
                              </NavLink>
                           </div>
                        )}
                     </div>
                  ),
               )}
            </div>

            <div className='hidden md:flex gap-3 items-center'>
               <a
                  href='https://ednora.sourceforge.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all'
               >
                  <MdLaptopMac size={18} />
                  <span>Download Desktop App</span>
                  <MdOpenInNew size={14} className='opacity-80' />
               </a>
            </div>

            <button
               className='md:hidden'
               onClick={() => setIsMenuOpen(prev => !prev)}
               aria-label='Toggle navigation menu'
            >
               {isMenuOpen ? (
                  <IoClose size={25} />
               ) : (
                  <IoMenu size={25} />
               )}
            </button>
         </nav>
      </>
   );
};

export default Navbar;
