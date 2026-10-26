import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAboutPage } from '../store/AboutSlice';
import frontendConfig from '../config/frontend.config.js';

/**
 * useAbout
 * Loads about page content (about hero, history, vision & mission, facilities)
 * directly from local frontend configuration without socket/backend dependency.
 */
const useAbout = () => {
   const About = useSelector(state => state.about.aboutPage);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!About) {
         dispatch(setAboutPage(frontendConfig.aboutPage));
      }
   }, [About, dispatch]);
};

export default useAbout;
