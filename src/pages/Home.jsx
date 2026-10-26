import Hero from '../components/Templates/home/Hero';
import Empower from '../components/Templates/home/Empower';
import Skills from '../components/Templates/home/Skills';
import Album from '../components/Templates/home/Album';
import Testimonials from '../components/Templates/home/Testimonials';

import useHomeUi from '../hooks/useHomeUi';
import { useSelector } from 'react-redux';
import Loader from '../components/Molecules/Loader/Loader';
import { useEffect } from 'react';

function Home() {
   let data = useSelector(state => state.home.landingPage);

   useHomeUi();

   if (!data) {
      return <Loader />;
   }

   return (
      <>
         <title>
            Ednora — Where Knowledge Finds Its Future | Top Computing
            & IT Academy
         </title>
         <meta
            name='description'
            content='Ednora — Where Knowledge Finds Its Future. Premier technical academy offering BCA, BBA, Full-Stack Web Development, hands-on computing labs, and comprehensive placement assistance.'
         />

         <Hero />
         <Empower />
         <Skills />
         <Album />
         <Testimonials />
      </>
   );
}

export default Home;
