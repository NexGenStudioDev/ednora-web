import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';

import QuickLinkSection from '../../components/Organisms/Admin/QuickLinkSection';
import DashboardCardSection from '../../components/Molecules/Admin/Dashboard/DashboardCardSection';
import socket from '../../config/socket.mjs';

let QuickLinkData = [
   {
      path: '/admin/DashBoard',
      text: 'Dashboard',
   },
   {
      path: '/admin/Contact',
      text: 'Contact',
   },
   {
      path: '/admin/create/Album',
      text: 'Create Album',
   },
   {
      path: 'https://sourceforge.net/projects/ednora/',
      text: 'Desktop App (Ednora)',
   },
];

const DashboardPage = () => {
   const [Cards, setCard] = useState();
   const [isError, setIsError] = useState(false);
   const [ErrorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      const handleDashboardData = data => {
         console.log('data from server DashBoard_Data', data);
         setCard(data?.DashBoard_Data || []);
      };

      // Connect socket if needed
      if (!socket.connected) {
         socket.connect();
      }

      socket.emit('Request_DashBoard_Data');
      socket.on('DashBoard_Data', handleDashboardData);

      socket.on('error', error => {
         console.error('Socket error:', error.message);
         setErrorMessage(error.message);
         setIsError(true);
      });

      return () => {
         socket.off('DashBoard_Data', handleDashboardData);
         socket.off('error');
      };
   }, []);

   return (
      <>
         <title>Admin DashBoard</title>
         <meta
            name='description'
            content="CIITM Admin Dashboard - Manage your institution's data efficiently."
         />

         <AdminTemplate pageName={'Dashboard'}>
            <div className='h-[80vh] flex flex-col justify-between w-full'>
               {isError && (
                  <div className='text-red-500 text-center mb-4'>
                     Error: {ErrorMessage}
                  </div>
               )}

               {!isError && <DashboardCardSection Cards={Cards} />}

               <QuickLinkSection links={QuickLinkData} />
            </div>
         </AdminTemplate>
      </>
   );
};

export default DashboardPage;
