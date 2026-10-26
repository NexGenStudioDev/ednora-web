import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import bulletPoint from '../../../assets/images/bulletPoint.svg';
import frontendConfig from '../../../config/frontend.config.js';

const FacilitiesCard = memo(({ title, index, isActive, onClick }) => {
   return (
      <div
         className={`FacilitesCard flex gap-3 rounded-md cursor-pointer w-full h-full p-2 ${
            isActive ? 'bg-[#FF6603] text-white' : ''
         }`}
         onClick={onClick}
      >
         <img
            src={bulletPoint}
            alt='icon'
            className='Facilites_Card_Image'
         />
         <h1 className='Facilites_Card_Title capitalize text-[1vw] max-[599px]:text-[4.6vw] font-medium'>
            {title}
         </h1>
      </div>
   );
});

const CampusFacilities = () => {
   const defaultFacilities = frontendConfig.aboutPage.Facilities;
   const defaultDesc = frontendConfig.aboutPage.Description;

   const [facilities, setFacilities] = useState(defaultFacilities);
   const [description, setDescription] = useState(defaultDesc);
   const [activeTab, setActiveTab] = useState(defaultFacilities[0]);

   const aboutPage = useSelector(state => state.about.aboutPage);

   useEffect(() => {
      if (aboutPage?.Facilities?.length) {
         setFacilities(aboutPage.Facilities);
         setDescription(aboutPage.Description || defaultDesc);
         setActiveTab(aboutPage.Facilities[0]);
      } else {
         setFacilities(defaultFacilities);
         setDescription(defaultDesc);
         setActiveTab(defaultFacilities[0]);
      }
   }, [aboutPage, defaultFacilities, defaultDesc]);

   return (
      <section className='w-full h-full px-8 max-[599px]:px-6 py-12 bg-[#333] flex items-center justify-between gap-2 max-[599px]:gap-10 max-[599px]:flex-col'>
         <div className='Facilites_Card_Container left w-[18.5%] max-[599px]:w-full h-full bg-white p-4 max-[599px]:p-8 rounded-2xl'>
            <div className='h-auto flex items-start justify-between flex-col gap-1.5 max-[599px]:gap-4'>
               {facilities.map((facility, index) => (
                  <FacilitiesCard
                     key={index}
                     title={facility.title}
                     index={index}
                     isActive={activeTab?.title === facility.title}
                     onClick={() => setActiveTab(facility)}
                  />
               ))}
            </div>
         </div>

         <div className='right w-[82.5%] max-[599px]:w-full text-white px-8 max-[599px]:px-0 h-full flex items-start justify-between flex-col gap-6'>
            <div className='facilities'>
               <h1 className='text-[1.2vw] max-[599px]:text-[5vw] font-semibold font-[Montserrat] mb-2'>
                  Campus and Facilities
               </h1>
               <p className='text-[0.9vw] max-[599px]:text-[3vw] w-[65%] max-[599px]:w-full'>
                  The University of the institute provides several
                  facilities to staff and students, which include
                  health, hostel, transport, library, sports, and
                  various others.
               </p>
            </div>

            <div className='dynamic-links'>
               <div className='link flex gap-3'>
                  <img src={bulletPoint} alt='bullet point' />
                  <h1 className='text-[0.95vw] capitalize max-[599px]:text-[3.6vw]'>
                     {activeTab?.title || 'Hostels'}
                  </h1>
               </div>
               <p className='text-[0.9vw] max-[599px]:text-[3vw] my-4 w-[60%] max-[599px]:w-full'>
                  There are twenty eight{' '}
                  {activeTab?.title || 'Hostels'} including eleven
                  separate {activeTab?.title || 'Hostels'} for female
                  students. The residential accommodation in each of
                  these {activeTab?.title || 'Hostels'} comprises of
                  cubicles and three-seat dormitories.
               </p>
            </div>

            <div className='discription w-full h-full flex max-[599px]:flex-col items-start justify-start gap-7'>
               <div className='img-container w-[10vw] max-[599px]:w-full h-[10vw] max-[599px]:h-[45vw] bg-[#FFE7E7] rounded-2xl overflow-hidden'>
                  <img
                     src={activeTab?.image || description.image}
                     alt='Facility Image'
                     className='w-full h-full object-cover'
                  />
               </div>
               <div className='headings w-[41vw] max-[599px]:w-full h-full flex items-start justify-between flex-col gap-2'>
                  <h1 className='text-[1.2vw] max-[599px]:text-[3.5vw] font-semibold'>
                     Description
                  </h1>
                  <p className='text-[0.9vw] max-[599px]:text-[3vw]'>
                     {activeTab?.description || description.paragraph}
                  </p>
                  <div className='flex gap-4 text-[0.9vw] max-[599px]:text-[3.4vw]'>
                     <div className='heading-1 flex gap-3'>
                        <p className='text-[#FF6603] font-semibold'>
                           Per Month
                        </p>
                        <p>{activeTab?.price || description.price}</p>
                     </div>
                     <div className='heading-2 flex gap-3'>
                        <p className='text-[#FF6603] font-semibold'>
                           Room
                        </p>
                        <p>{activeTab?.room || description.room}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default memo(CampusFacilities);
