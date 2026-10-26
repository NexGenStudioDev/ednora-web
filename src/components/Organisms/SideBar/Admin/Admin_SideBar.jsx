import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BiHomeSmile } from 'react-icons/bi';
import { TbPigMoney } from 'react-icons/tb';
import { SiCoursera } from 'react-icons/si';
import { FaImage } from 'react-icons/fa';
import { GoBellFill } from 'react-icons/go';
import { PiStudentBold } from 'react-icons/pi';
import { GiCash } from 'react-icons/gi';
import { MdSystemUpdateAlt } from 'react-icons/md';
import gsap from 'gsap';
import AdminSidebarLink from '../../../Atoms/Links/AdminSidebarLink';
import { FaBookBookmark } from 'react-icons/fa6';
import { PiChalkboardTeacher } from 'react-icons/pi';
import { MdSpaceDashboard, MdLaptopMac } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';

const links = [
   {
      name: 'Go to Website',
      link: '/',
      icon: <BiHomeSmile />,
   },
   {
      name: 'Desktop App (Ednora)',
      link: 'https://sourceforge.net/projects/ednora/',
      icon: <MdLaptopMac />,
   },
   {
      name: 'Dashboard',
      link: '/admin/DashBoard',
      icon: <MdSpaceDashboard />,
   },
   {
      name: 'Earnings',
      link: '/admin/Student/Earning',
      icon: <TbPigMoney />,
   },
   {
      name: 'Notifications',
      link: '#',
      icon: <GoBellFill />,
   },
   {
      name: 'Students',
      link: '/admin/Students',
      icon: <PiStudentBold />,
   },
   {
      name: 'Create Courses',
      link: '/admin/Create/Contact',
      icon: <FaBookBookmark />,
   },
   {
      name: 'Create Teacher',
      link: '/admin/create-teacher',
      icon: <PiChalkboardTeacher />,
   },
   { name: 'Image', link: '/admin/create/Image', icon: <FaImage /> },
   {
      name: 'Fee Payment',
      link: '/admin/student/pay/fee',
      icon: <GiCash />,
   },
   {
      name: 'Update Status',
      link: '/admin/update/status',
      icon: <MdSystemUpdateAlt />,
   },
   {
      name: 'Role Management',
      link: '/admin/role-management',
      icon: <FaUserShield />,
   },
];

const Admin_SideBar = () => {
   const menu = useSelector(state => state.menu.menu);
   const dispatch = useDispatch();
   const sideBarRef = useRef();

   const isMobile = () => window.innerWidth < 1000;

   const handleSidebarOpen = () => {
      if (isMobile()) {
         gsap.to(sideBarRef.current, {
            y: '0%',
            duration: 0.5,
            delay: 0.1,
            ease: 'power3.out',
            display: 'flex',
         });
      }
   };

   const handleSidebarClose = () => {
      if (isMobile()) {
         gsap.to(sideBarRef.current, {
            y: '-100%',
            delay: 0.1,
            duration: 0.5,
            ease: 'power3.in',
         });
      }
   };

   useEffect(() => {
      if (menu) {
         handleSidebarOpen();
      } else {
         handleSidebarClose();
      }
   }, [menu]);

   useEffect(() => {
      if (isMobile()) {
         handleSidebarClose();
      }
   }, [location.pathname]);

   return (
      <div
         ref={sideBarRef}
         className='Side_bar fixed z-10 w-screen h-screen  ease-in-out  bg-black p-[2vw]  flex-col items-center justify-center overflow-hidden  min-[1000px]:relative md:w-[30%] lg:w-[25%]  md:h-[130vh]  md:bg-[#1C1C1C]  md:ml-[1.5vw]  md:rounded-xl  md:border  md:border-[#322F2F]  min-[999px]:mt-[3.7vh]  mb-[15vh]  print:hidden 
      '
      >
         <div className='w-full h-[70%] flex flex-col mt-[22vh] md:mt-[4vh] gap-[3vh]'>
            {links.map((link, index) => (
               <AdminSidebarLink
                  key={index}
                  icon={link.icon}
                  link={link.link}
                  name={link.name}
               />
            ))}
         </div>
      </div>
   );
};

export default Admin_SideBar;
