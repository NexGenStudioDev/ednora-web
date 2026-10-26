import { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import P4 from '../../Atoms/Paragraph/P4';
import H5 from '../../Atoms/Heading/H5';
import frontendConfig from '../../../config/frontend.config.js';

const Skills = () => {
   const defaultGoals = frontendConfig.landingPage.Mission_and_Goals;
   const [goals, setGoals] = useState(defaultGoals);
   const [error, setError] = useState(false);
   const data = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (data?.Mission_and_Goals && data.Mission_and_Goals.length > 0) {
         setGoals(data.Mission_and_Goals);
         setError(false);
      } else {
         setGoals(defaultGoals);
         setError(false);
      }
   }, [data, defaultGoals]);

   if (error) {
      return (
         <div className='skills-error flex items-center justify-center bg-[#333] py-[8vh]'>
            <h1 className='text-red-500 font-bold text-2xl'>
               Data Not Loaded
            </h1>
         </div>
      );
   }

   if (!goals || goals.length === 0) {
      return (
         <div className='no-goals flex items-center justify-center text-white bg-[#333] py-12'>
            <p className='text-xl'>
               No goals available at the moment.
            </p>
         </div>
      );
   }

   return (
      <div className='skills-container flex flex-wrap md:flex-nowrap bg-[#333] py-[8vh] md:py-[6vh] px-[2.8vw] md:px-[1.2vw] max-[528px]:gap-[2.5vh] gap-10 items-center justify-center'>
         {goals.map(item => (
            <div
               key={item._id}
               className='goal-card rounded-lg flex flex-col justify-center py-[2vw] md:py-[0.8vh] px-[2.8vw] md:px-[0.8vw] bg-white max-[350px]:w-[80%] max-[528px]:w-auto h-auto sm:w-[40vw] md:w-[15vw]'
            >
               <div className='image w-[5vw] max-[528px]:h-auto max-[528px]:w-[28%] md:w-[2.5vw]'>
                  <img
                     src={item.image}
                     alt={item.title || 'Goal Image'}
                     loading='lazy'
                     className='object-cover w-full h-full rounded-full'
                  />
               </div>
               <H5 Tailwind_utility_Class='max-[590px]:text-[2.8vw] max-[998px]:text-[2vw] text-[1vw] font-medium'>
                  {item.title}
               </H5>
               <P4 Tailwind_utility_Class='goal-content text-gray-500 text-[2vw] max-[528px]:text-[2.5vw] md:text-[0.8vw]'>
                  {item.content}
               </P4>
            </div>
         ))}
      </div>
   );
};

export default memo(Skills);
