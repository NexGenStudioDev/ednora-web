import React from 'react';

import History from '../components/Templates/about/History';
import AboutHero from '../components/Templates/about/AboutHero';
import Teachers from '../components/Templates/about/Teachers';
import Courses from '../components/Templates/about/Courses';
import CampusFacilities from '../components/Templates/about/CampusFacilities';
import { useSelector } from 'react-redux';
import useAbout from '../hooks/useAbout';
import Loader from '../components/Molecules/Loader/Loader';

const About = () => {
   let about = useSelector(state => state.about.aboutPage);

   useAbout();

   if (!about) {
      return <Loader />;
   }

   return (
      <>
         <title>About Us — Ednora | Where Knowledge Finds Its Future</title>
         <meta
            name='description'
            content='Learn about Ednora, our history, mission, modern computing facilities, and dedicated faculty preparing students for technical excellence.'
         />

         <AboutHero />
         <History />
         <Teachers />
         <Courses />
         <CampusFacilities />
      </>
   );
};

export default About;
