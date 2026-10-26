import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoticeCard from '../../Molecules/Cards/NoticeCard';
import Loader from '../../Molecules/Loader/Loader';
import P3 from '../../Atoms/Paragraph/P3';
import H1 from '../../Atoms/Heading/H1';
import frontendConfig from '../../../config/frontend.config.js';

const Hero = React.memo(() => {
   const defaultHero = frontendConfig.landingPage.HeroSection;
   const [image, setImage] = useState(defaultHero.homeBackgroundImage);
   const [heading, setHeading] = useState(defaultHero.homeTitle);
   const [paragraph, setParagraph] = useState(defaultHero.homeParagraph);

   const hero = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (hero?.HeroSection) {
         const { homeBackgroundImage, homeTitle, homeParagraph } =
            hero.HeroSection;
         setImage(homeBackgroundImage || defaultHero.homeBackgroundImage);
         setHeading(homeTitle || defaultHero.homeTitle);
         setParagraph(homeParagraph || defaultHero.homeParagraph);
      }
   }, [hero, defaultHero]);

   if (!hero) return <Loader />;

   return (
      <section
         className='w-full min-h-screen flex flex-col lg:flex-row items-center justify-center text-white bg-cover bg-no-repeat px-10 relative overflow-clip'
         style={{
            backgroundImage: `url(${image || '/Home_bg.webp'})`,
         }}
      >
         <div className='text w-full lg:w-1/2 h-full flex items-start justify-center lg:justify-center flex-col gap-3 absolute left-[3vw]'>
            <H1 Tailwind_utility_Class='max-[400px]:text-[8.5vw] text-[6.5vw] min-[768px]:text-[7vw] min-[768px]:w-[15ch] lg:text-[4vw] font-bold md:text-[4vw] md:w-[15ch] lg:font-[700] leading-tight w-[66vw] lg:w-fit max-[896px]:w-[85vw]'>
               {heading}
            </H1>

            <P3 Tailwind_utility_Class='max-[400px]:text-[6vw] sm:text-xl md:text-balance w-[70%]'>
               {paragraph}
            </P3>
         </div>

         <div className='card-container absolute bottom-[3vh] right-[2vw] lg:h-full w-full sm:max-w-md lg:w-1/2 flex items-end justify-end pb-10 flex-col gap-4 -mb-20'>
            <NoticeCard
               title='Download Desktop App (Ednora)'
               link='https://sourceforge.net/projects/ednora/'
               buttonText='Download'
            />
            <NoticeCard
               title='Apply online admission 2026-2027'
               link='/admission'
               buttonText='Apply Now'
            />
         </div>
      </section>
   );
});

export default Hero;
